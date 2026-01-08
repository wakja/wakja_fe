"use client";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 */}
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] rounded-[2px] w-full max-w-[400px] mx-4 shadow-lg">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[#f8f8f8]">
          <h2 className="text-[14px] font-medium m-0">피드백 보내기</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[18px] text-[var(--text-muted)] hover:text-[var(--foreground)] bg-transparent border-none p-0 leading-none"
          >
            &times;
          </button>
        </div>

        {/* 바디 */}
        <div className="p-4">
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
                  defaultChecked
                  className="accent-[var(--primary)]"
                />
                <span className="text-[13px]">버그</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="feedbackType"
                  value="suggestion"
                  className="accent-[var(--primary)]"
                />
                <span className="text-[13px]">제안</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="feedbackType"
                  value="other"
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
            />
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              취소
            </button>
            <button type="button" className="btn btn-primary">
              제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
