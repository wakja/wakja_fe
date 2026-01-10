"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (err: any) {
      setError(err?.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-8">
      <div className="w-full max-w-[360px] mx-4">
        {/* 로고 */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="text-[24px] font-bold text-[var(--primary-dark)] hover:no-underline"
          >
            왁자
          </Link>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">
            로그인하고 한마디 던지세요
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* 에러 메시지 */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-[13px] rounded">
                  {error}
                </div>
              )}

              {/* 이메일 */}
              <div className="mb-4">
                <label className="block text-[12px] text-[var(--text-muted)] mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* 비밀번호 */}
              <div className="mb-4">
                <label className="block text-[12px] text-[var(--text-muted)] mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="btn btn-primary w-full py-3 text-[14px]"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "로그인 중..." : "로그인"}
              </button>
            </form>

            {/* 구분선 */}
            <div className="flex items-center gap-3 my-4">
              <span className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-[11px] text-[var(--text-light)]">또는</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* 회원가입 링크 */}
            <div className="text-center">
              <span className="text-[13px] text-[var(--text-muted)]">
                아직 계정이 없으신가요?{" "}
              </span>
              <Link
                href="/signup"
                className="text-[13px] text-[var(--primary-dark)] font-medium hover:underline"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
