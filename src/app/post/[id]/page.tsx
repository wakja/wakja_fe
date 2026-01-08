"use client";

import Link from "next/link";
import CommentItem from "@/components/CommentItem";

// 더미 데이터 (나중에 API 연동)
const mockPost = {
  id: 1,
  title: "첫 번째 글입니다",
  author: "익명123",
  createdAt: "2025-01-06 14:32",
  views: 42,
  likeCount: 5,
  content: `안녕하세요!

첫 번째 글을 작성해봅니다.

**마크다운**도 지원됩니다.

- 리스트 1
- 리스트 2
- 리스트 3

좋은 하루 보내세요!`,
  isOwner: true,
};

const mockComments = [
  { id: 1, author: "댓글러1", content: "첫 댓글입니다!", createdAt: "01-06 14:35", isOwner: false },
  { id: 2, author: "댓글러2", content: "좋은 글이네요 ㅎㅎ", createdAt: "01-06 14:40", isOwner: false },
  { id: 3, author: "익명123", content: "감사합니다!", createdAt: "01-06 14:45", isOwner: true },
];

export default function PostDetailPage() {
  // TODO: params에서 id 가져오기, 게시글 데이터 fetch

  return (
    <main className="container py-4">
      {/* 게시글 카드 */}
      <div className="card mb-4">
        {/* 헤더 */}
        <div className="card-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/feed"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)]"
            >
              &larr; 목록
            </Link>
            <span className="text-[var(--border)]">|</span>
            <span className="text-[13px] font-medium">{mockPost.title}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-light)]">
            <span>조회 {mockPost.views}</span>
            <span>|</span>
            <span>{mockPost.createdAt}</span>
          </div>
        </div>

        {/* 작성자 정보 */}
        <div className="px-3 py-2 border-b border-[var(--border)] flex items-center justify-between bg-[#fafafa]">
          <span className="text-[12px] text-[var(--text-muted)]">
            작성자: <strong className="text-[var(--foreground)]">{mockPost.author}</strong>
          </span>
          {mockPost.isOwner && (
            <div className="flex items-center gap-2">
              <Link
                href={`/write?edit=${mockPost.id}`}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--foreground)]"
              >
                수정
              </Link>
              <span className="text-[var(--border)]">|</span>
              <button
                type="button"
                className="text-[11px] text-[var(--danger)] hover:text-[var(--danger-hover)] bg-transparent border-none p-0"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="card-body">
          <div className="text-[13px] leading-relaxed whitespace-pre-wrap">
            {/* TODO: 마크다운 렌더링 */}
            {mockPost.content}
          </div>
        </div>

        {/* 좋아요(지껄) 버튼 */}
        <div className="px-3 py-3 border-t border-[var(--border)] flex items-center justify-center">
          <button
            type="button"
            className="relative flex flex-col items-center gap-1 px-6 py-2 bg-transparent border border-[var(--border)] rounded-[2px] hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors group"
          >
            <span className="text-[20px] group-hover:scale-110 transition-transform">
              🗣️
            </span>
            <span className="text-[12px] text-[var(--text-muted)] group-hover:text-[var(--primary-dark)]">
              지껄 <strong className="text-[var(--primary-dark)]">{mockPost.likeCount}</strong>
            </span>
          </button>
        </div>

        {/* 신고 버튼 */}
        <div className="px-3 py-2 border-t border-[var(--border)] flex justify-end">
          <button
            type="button"
            className="text-[11px] text-[var(--text-light)] hover:text-[var(--danger)] bg-transparent border-none p-0"
          >
            신고
          </button>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="card">
        <div className="card-header">
          댓글 <span className="text-[var(--primary-dark)]">{mockComments.length}</span>개
        </div>

        {/* 댓글 목록 */}
        <div className="card-body">
          {mockComments.length > 0 ? (
            <div>
              {mockComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  id={comment.id}
                  author={comment.author}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  isOwner={comment.isOwner}
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
        <div className="px-3 py-3 border-t border-[var(--border)] bg-[#fafafa]">
          <div className="flex gap-2">
            <textarea
              className="textarea flex-1"
              placeholder="댓글을 입력하세요..."
              rows={2}
            />
            <button type="button" className="btn btn-primary self-end">
              등록
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
