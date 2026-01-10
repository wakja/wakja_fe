"use client";

import { useState } from "react";
import { useCreateFeedback } from "@/hooks/feedback";
import type { FeedbackType } from "@/features/feedback/types";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [type, setType] = useState<FeedbackType>("bug");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const feedbackMutation = useCreateFeedback();

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!content.trim()) {
      setError("내용을 입력해주세요.");
      return;
    }

    try {
      await feedbackMutation.mutateAsync({ type, content });
      setSuccess(true);
      setContent("");
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 1500);
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
          : "피드백 제출에 실패했습니다.";
      setError(errorMessage);
    }
  };

  const handleClose = () => {
    setContent("");
    setType("bug");
    setError("");
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* 모달 */}
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] rounded-[2px] w-full max-w-[400px] mx-4 shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[#f8f8f8]">
          <h2 className="text-[14px] font-medium m-0">피드백 보내기</h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-[18px] text-[var(--text-muted)] hover:text-[var(--foreground)] bg-transparent border-none p-0 leading-none"
          >
            &times;
          </button>
        </div>

        <div className="p-4">
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 text-[13px] rounded">
              피드백이 성공적으로 제출되었습니다!
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-[13px] rounded">
              {error}
            </div>
          )}

          {/* 타입 선택 */}
          <div className="mb-4">
            <label className="block text-[12px] text-[var(--text-muted)] mb-2">
              피드백 유형
            </label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="feedbackType"
                  value="bug"
                  checked={type === "bug"}
                  onChange={(e) => setType(e.target.value as FeedbackType)}
                  className="accent-[var(--primary)]"
                />
                <span className="text-[13px]">버그</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="feedbackType"
                  value="suggestion"
                  checked={type === "suggestion"}
                  onChange={(e) => setType(e.target.value as FeedbackType)}
                  className="accent-[var(--primary)]"
                />
                <span className="text-[13px]">제안</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="feedbackType"
                  value="other"
                  checked={type === "other"}
                  onChange={(e) => setType(e.target.value as FeedbackType)}
                  className="accent-[var(--primary)]"
                />
                <span className="text-[13px]">기타</span>
              </label>
            </div>
          </div>

          {/* 내용 입력 */}
          <div className="mb-4">
            <label className="block text-[12px] text-[var(--text-muted)] mb-2">
              내용
            </label>
            <textarea
              className="textarea"
              placeholder="피드백 내용을 입력해주세요..."
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
              disabled={feedbackMutation.isPending}
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={feedbackMutation.isPending}
            >
              {feedbackMutation.isPending ? "제출 중..." : "제출"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
