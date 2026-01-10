"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/auth";
import { useLogout } from "@/hooks/auth";
import FeedbackModal from "./FeedbackModal";

export default function Header() {
  const { user, isLoggedIn } = useAuth();
  const logoutMutation = useLogout();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <>
      <header className="bg-[var(--primary)] border-b border-[var(--primary-dark)]">
        <div className="container">
          <div className="flex items-center justify-between h-[42px]">
            {/* 로고 */}
            <Link
              href="/"
              className="flex items-center gap-1.5 no-underline hover:no-underline"
            >
              <Image src="/wakja.png" alt="왁자" width={28} height={28} />
              <span className="text-[18px] font-bold text-black">왁자</span>
            </Link>

            {/* 네비게이션 */}
            <nav className="flex items-center gap-4">
              <Link
                href="/post"
                className="text-[13px] text-black hover:underline"
              >
                피드
              </Link>

              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(true)}
                className="text-[13px] text-black hover:underline bg-transparent border-none"
              >
                피드백
              </button>

              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-black/70">
                    {user?.nickname}님
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="btn btn-sm bg-black/10 border-black/20 text-black hover:bg-black/20"
                  >
                    {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="btn btn-sm bg-black/10 border-black/20 text-black hover:bg-black/20 hover:no-underline"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="btn btn-sm bg-black/10 text-[var(--primary)] border-black hover:bg-black/20 hover:no-underline"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </>
  );
}
