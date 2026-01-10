"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { useGetPost, useToggleLike, useDeletePost } from "@/hooks/post";
import {
  useGetComments,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "@/hooks/comment";
import type { Comment } from "@/features/comment/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ConfirmModal from "@/components/ConfirmModal";
import ImageModal from "@/components/ImageModal";

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const { isLoggedIn } = useAuth();
  const { data: postData, isLoading: postLoading } = useGetPost(postId);
  const { data: commentsData, isLoading: commentsLoading } =
    useGetComments(postId);

  const toggleLikeMutation = useToggleLike(postId);
  const deletePostMutation = useDeletePost(postId);
  const createCommentMutation = useCreateComment(postId);

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const post = postData?.data;
  const comments = commentsData?.data ?? [];

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    setIsLikeAnimating(true);
    await toggleLikeMutation.mutateAsync();
    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  const handleDeletePost = async () => {
    await deletePostMutation.mutateAsync();
  };

  const handleCreateComment = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        content: newComment,
      });
      setNewComment("");
    } catch {
      alert("댓글 작성에 실패했습니다.");
    }
  };

  if (postLoading) {
    return (
      <main className="container py-4">
        <LoadingSpinner />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="container py-4">
        <div className="text-center py-8">게시글을 찾을 수 없습니다.</div>
      </main>
    );
  }

  return (
    <main className="container py-4">
      {/* 게시글 카드 */}
      <div className="card mb-4">
        {/* 헤더 */}
        <div className="card-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/post"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)]"
            >
              &larr; 목록
            </Link>
            <span className="text-[var(--border)]">|</span>
            <span className="text-[13px] font-medium">{post.title}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-light)]">
            <span>조회 {post.view_count}</span>
            <span>|</span>
            <span>{post.created_at}</span>
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className="px-3 py-2 border-b border-[var(--border)] flex items-center justify-between bg-[#fafafa]">
          <span className="text-[12px] text-[var(--text-muted)]">
            작성자:{" "}
            <strong className="text-[var(--foreground)]">
              {post.author_nickname}
            </strong>
          </span>
          {post.is_owner && (
            <div className="flex items-center gap-2">
              <Link
                href={`/write?id=${post.id}`}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--foreground)]"
              >
                수정
              </Link>
              <span className="text-[var(--border)]">|</span>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="text-[11px] text-[var(--danger)] hover:text-[var(--danger-hover)] bg-transparent border-none p-0"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="card-body">
          <MarkdownRenderer content={post.content} />

          {/* 첨부 이미지 */}
          {post.images && post.images.length > 0 && (
            <div className="mt-6 flex gap-3">
              {post.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative w-[200px] h-[200px] border border-[var(--border)] rounded-[2px] overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <Image
                    src={imageUrl}
                    alt={`첨부 이미지 ${index + 1}`}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-[12px] bg-black/50 px-3 py-1 rounded-full">
                      크게 보기
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 좋아요(따봉) 버튼 */}
        <div className="px-3 py-3 border-t border-[var(--border)] flex items-center justify-center">
          <button
            type="button"
            onClick={handleLike}
            disabled={toggleLikeMutation.isPending}
            className={`relative flex flex-col items-center gap-1 px-6 py-2 bg-transparent border border-[var(--border)] rounded-[2px] hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors group ${
              post.is_liked ? "border-[var(--primary)] bg-[var(--primary)]/10" : ""
            } ${isLikeAnimating ? "jjiggul-particle" : ""}`}
          >
            <span className="text-[20px] group-hover:scale-110 transition-transform">
              🗣️
            </span>
            <span className="text-[12px] text-[var(--text-muted)] group-hover:text-[var(--primary-dark)]">
              따봉{" "}
              <strong className="text-[var(--primary-dark)]">
                {post.like_count}
              </strong>
            </span>
          </button>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="card">
        <div className="card-header">
          댓글{" "}
          <span className="text-[var(--primary-dark)]">{comments.length}</span>개
        </div>

        {/* 댓글 목록 */}
        <div className="card-body">
          {commentsLoading ? (
            <LoadingSpinner />
          ) : comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <CommentItemWithActions
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  editingCommentId={editingCommentId}
                  editingContent={editingContent}
                  setEditingCommentId={setEditingCommentId}
                  setEditingContent={setEditingContent}
                />
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-[var(--text-muted)] text-center py-6">
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </p>
          )}
        </div>

        {/* 댓글 작성 폼 */}
        {isLoggedIn && (
          <div className="px-3 py-3 border-t border-[var(--border)] bg-[#fafafa]">
            <div className="flex gap-2">
              <textarea
                className="textarea flex-1"
                placeholder="댓글을 입력하세요..."
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="button"
                onClick={handleCreateComment}
                disabled={createCommentMutation.isPending}
                className="btn btn-primary self-end"
              >
                {createCommentMutation.isPending ? "등록 중..." : "등록"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 게시글 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePost}
        title="게시글 삭제"
        message="정말로 이 게시글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
}

interface CommentItemWithActionsProps {
  comment: Comment;
  postId: number;
  editingCommentId: number | null;
  editingContent: string;
  setEditingCommentId: (id: number | null) => void;
  setEditingContent: (content: string) => void;
}

function CommentItemWithActions({
  comment,
  postId,
  editingCommentId,
  editingContent,
  setEditingCommentId,
  setEditingContent,
}: CommentItemWithActionsProps) {
  const updateCommentMutation = useUpdateComment(postId, comment.id);
  const deleteCommentMutation = useDeleteComment(postId, comment.id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleSaveEdit = async () => {
    if (!editingContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await updateCommentMutation.mutateAsync({ content: editingContent });
      setEditingCommentId(null);
      setEditingContent("");
    } catch (error) {
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    await deleteCommentMutation.mutateAsync();
  };

  const isEditing = editingCommentId === comment.id;

  return (
    <>
      <div className="py-3 border-b border-[var(--border)] last:border-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <strong className="text-[13px] text-[var(--foreground)]">
              {comment.author_nickname}
            </strong>
            <span className="text-[11px] text-[var(--text-light)]">
              {comment.created_at}
            </span>
          </div>
          {comment.is_owner && !isEditing && (
            <div className="flex items-center gap-2 text-[11px]">
              <button
                type="button"
                onClick={handleEdit}
                className="text-[var(--text-muted)] hover:text-[var(--foreground)] bg-transparent border-none p-0"
              >
                수정
              </button>
              <span className="text-[var(--border)]">|</span>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="text-[var(--text-muted)] hover:text-[var(--danger)] bg-transparent border-none p-0"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex gap-2">
            <textarea
              className="textarea flex-1"
              rows={2}
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={updateCommentMutation.isPending}
                className="btn btn-sm btn-primary"
              >
                {updateCommentMutation.isPending ? "저장 중..." : "저장"}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-sm btn-secondary"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <p className="text-[13px] text-[var(--foreground)] whitespace-pre-wrap">
            {comment.content}
          </p>
        )}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="댓글 삭제"
        message="정말로 이 댓글을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
