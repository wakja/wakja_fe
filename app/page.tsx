import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        {/* 슬로건 */}
        <h1 className="text-[28px] font-bold text-[var(--foreground)] mb-2">
          왁자지껄
        </h1>
        <p className="text-[14px] text-[var(--text-muted)] mb-8">
          자유롭게 떠들어보세요
        </p>

        {/* CTA 버튼 */}
        <Link
          href="/write"
          className="inline-flex items-center justify-center px-6 py-3 bg-[var(--primary)] text-black font-medium text-[15px] rounded-[2px] border border-[var(--primary-dark)] hover:bg-[var(--primary-hover)] hover:no-underline transition-colors"
        >
          지금 한마디 던지기
        </Link>

        {/* 서브 링크 */}
        <div className="mt-6">
          <Link
            href="/post"
            className="text-[13px] text-[var(--text-muted)] hover:text-[var(--foreground)]"
          >
            다른 사람들의 이야기 보러가기 &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
