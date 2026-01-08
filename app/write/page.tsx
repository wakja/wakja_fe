"use client";

import Link from "next/link";

export default function WritePage() {
  // TODO: 수정 모드 처리 (searchParams에서 edit 파라미터 확인)
  const isEditMode = false;

  return (
    <main className="container py-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[16px] font-medium text-[var(--foreground)] m-0">
          {isEditMode ? "글 수정" : "글 작성"}
        </h1>
        <Link
          href="/feed"
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
            />
          </div>

          {/* 본문 입력 (마크다운 에디터) */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[12px] text-[var(--text-muted)]">
                본문 <span className="text-[var(--danger)]">*</span>
              </label>
              <span className="text-[11px] text-[var(--text-light)]">
                마크다운 지원
              </span>
            </div>

            {/* 에디터 툴바 */}
            <div className="flex items-center gap-1 p-2 bg-[#f8f8f8] border border-[var(--border)] border-b-0 rounded-t-[2px]">
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="굵게"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="기울임"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="취소선"
              >
                <s>S</s>
              </button>
              <span className="w-px h-4 bg-[var(--border)] mx-1" />
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="링크"
              >
                🔗
              </button>
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="이미지"
              >
                🖼️
              </button>
              <span className="w-px h-4 bg-[var(--border)] mx-1" />
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="목록"
              >
                •
              </button>
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="인용"
              >
                &gt;
              </button>
              <button
                type="button"
                className="p-1 text-[12px] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] rounded-[2px]"
                title="코드"
              >
                {"</>"}
              </button>
            </div>

            {/* 텍스트에어리어 */}
            <textarea
              className="w-full p-3 border border-[var(--border)] border-t-0 rounded-b-[2px] text-[13px] min-h-[300px] resize-y focus:outline-none focus:border-[var(--primary)]"
              placeholder="내용을 입력하세요...&#10;&#10;마크다운 문법을 사용할 수 있습니다.&#10;이미지는 클립보드에서 붙여넣기 가능합니다. (최대 2장)"
            />
          </div>

          {/* 이미지 첨부 영역 */}
          <div className="mb-4">
            <label className="block text-[12px] text-[var(--text-muted)] mb-2">
              이미지 첨부 <span className="text-[var(--text-light)]">(최대 2장)</span>
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center justify-center w-[80px] h-[80px] border border-dashed border-[var(--border)] rounded-[2px] cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors">
                <span className="text-[24px] text-[var(--text-light)]">+</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
              {/* 첨부된 이미지 미리보기 예시 */}
              <div className="relative w-[80px] h-[80px] border border-[var(--border)] rounded-[2px] bg-[#f8f8f8] flex items-center justify-center">
                <span className="text-[11px] text-[var(--text-light)]">미리보기</span>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--danger)] text-white rounded-full text-[12px] leading-none flex items-center justify-center hover:bg-[var(--danger-hover)]"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <Link
              href="/feed"
              className="btn btn-secondary"
            >
              취소
            </Link>
            <button type="button" className="btn btn-primary">
              {isEditMode ? "수정하기" : "작성하기"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
