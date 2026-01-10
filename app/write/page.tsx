"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/auth";
import { useGetPost, useCreatePost, useUpdatePost } from "@/hooks/post";
import { useUploadImage } from "@/hooks/upload";
import LoadingSpinner from "@/components/LoadingSpinner";

const MDXEditorWrapper = dynamic(
  () => import("@/components/MDXEditorWrapper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[300px]">
        <LoadingSpinner />
      </div>
    ),
  }
);

function WritePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editPostId = searchParams.get("id");
  const isEditMode = !!editPostId;

  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { data: postData } = useGetPost(editPostId ? Number(editPostId) : 0);
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost(editPostId ? Number(editPostId) : 0);
  const uploadImageMutation = useUploadImage();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync form state with server data for edit mode
  useEffect(() => {
    if (postData?.data) {
      const data = postData.data;
      setTitle(data.title ?? "");
      setContent(data.content ?? "");
      setImages(data.images ?? []);
    }
  }, [postData]);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [authLoading, isLoggedIn, router]);

  const handleImageUpload = async (file: File) => {
    if (images.length >= 2) {
      alert("이미지는 최대 2장까지 첨부 가능합니다.");
      return;
    }

    try {
      const result = await uploadImageMutation.mutateAsync(file);
      const imageUrl = result.data?.url;
      if (imageUrl) {
        setImages((prev) => [...prev, imageUrl]);
      }
    } catch {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("본문을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        title: title.trim() || undefined,
        content: content.trim(),
        images: images.length > 0 ? images : undefined,
      };

      if (isEditMode) {
        await updatePostMutation.mutateAsync(postData);
      } else {
        await createPostMutation.mutateAsync(postData);
      }
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data &&
        typeof error.response.data.message === "string"
          ? error.response.data.message
          : "게시글 저장에 실패했습니다.";
      alert(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <main className="container py-4">
        <LoadingSpinner />
      </main>
    );
  }

  return (
    <main className="container py-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[16px] font-medium text-[var(--foreground)] m-0">
          {isEditMode ? "글 수정" : "글 작성"}
        </h1>
        <Link
          href="/post"
          className="text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)]"
        >
          취소
        </Link>
      </div>

      {/* 작성 폼 */}
      <div className="card">
        <div className="card-body">
          {/* 제목 입력 */}
          <div className="mb-4">
            <label className="block text-[12px] text-[var(--text-muted)] mb-2">
              제목 <span className="text-[var(--text-light)]">(선택)</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 본문 입력 (MDX 에디터 - WYSIWYG) */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[12px] text-[var(--text-muted)]">
                본문 <span className="text-[var(--danger)]">*</span>
              </label>
              <span className="text-[11px] text-[var(--text-light)]">
                리치 텍스트 편집기
              </span>
            </div>

            {/* MDX Editor */}
            <div className="border border-[var(--border)] rounded-[2px] overflow-hidden">
              <MDXEditorWrapper content={content} onChange={setContent} />
            </div>
          </div>

          {/* 이미지 첨부 영역 */}
          <div className="mb-4">
            <label className="block text-[12px] text-[var(--text-muted)] mb-2">
              이미지 첨부{" "}
              <span className="text-[var(--text-light)]">(최대 2장)</span>
            </label>
            <div className="flex items-center gap-3">
              {images.length < 2 && (
                <label className="flex items-center justify-center w-[80px] h-[80px] border border-dashed border-[var(--border)] rounded-[2px] cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors">
                  <span className="text-[24px] text-[var(--text-light)]">
                    +
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}

              {images.map((url, index) => (
                <div
                  key={index}
                  className="relative w-[80px] h-[80px] border border-[var(--border)] rounded-[2px] overflow-visible"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-[2px]">
                    <Image
                      src={url}
                      alt={`첨부 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-[var(--danger)] text-white rounded-full text-[14px] font-bold leading-none flex items-center justify-center hover:bg-[var(--danger-hover)] shadow-md border-2 border-white"
                    title="이미지 삭제"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <Link href="/post" className="btn btn-secondary">
              취소
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting
                ? isEditMode
                  ? "수정 중..."
                  : "작성 중..."
                : isEditMode
                ? "수정하기"
                : "작성하기"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function WritePageContainer() {
  const searchParams = useSearchParams();
  const editPostId = searchParams.get("id");

  return <WritePageContent key={editPostId || "new"} />;
}

export default function WritePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <WritePageContainer />
    </Suspense>
  );
}
