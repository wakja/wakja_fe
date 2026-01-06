interface CommentItemProps {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  isOwner: boolean;
}

export default function CommentItem({
  id,
  author,
  content,
  createdAt,
  isOwner,
}: CommentItemProps) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-[var(--border)] last:border-b-0">
      {/* 작성자 정보 */}
      <div className="flex-shrink-0 w-[80px]">
        <span className="text-[12px] font-medium text-[var(--foreground)]">
          {author}
        </span>
      </div>

      {/* 댓글 내용 */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[var(--foreground)] break-words whitespace-pre-wrap m-0">
          {content}
        </p>
      </div>

      {/* 메타 정보 & 액션 */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <span className="text-[11px] text-[var(--text-light)]">
          {createdAt}
        </span>

        {isOwner && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="text-[11px] text-[var(--text-muted)] hover:text-[var(--foreground)] bg-transparent border-none p-0"
            >
              수정
            </button>
            <span className="text-[var(--border)]">|</span>
            <button
              type="button"
              className="text-[11px] text-[var(--danger)] hover:text-[var(--danger-hover)] bg-transparent border-none p-0"
            >
              삭제
            </button>
          </div>
        )}

        <button
          type="button"
          className="text-[11px] text-[var(--text-muted)] hover:text-[var(--danger)] bg-transparent border-none p-0"
        >
          신고
        </button>
      </div>
    </div>
  );
}
