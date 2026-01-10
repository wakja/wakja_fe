"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignup } from "@/hooks/auth";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const signupMutation = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nickname || !email || !password || !passwordConfirm) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    try {
      await signupMutation.mutateAsync({ nickname, email, password });
    } catch (err: any) {
      setError(err?.response?.data?.message || "회원가입에 실패했습니다.");
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
            새 계정을 만들어보세요
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* 에러 메시지 */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-[13px] rounded">
                  {error}
                </div>
              )}

              {/* 닉네임 */}
              <div className="mb-4">
                <label className="block text-[12px] text-[var(--text-muted)] mb-2">
                  닉네임 <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="사용할 닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <p className="text-[11px] text-[var(--text-light)] mt-1">
                  2~12자, 한글/영문/숫자 사용 가능
                </p>
              </div>

              {/* 이메일 */}
              <div className="mb-4">
                <label className="block text-[12px] text-[var(--text-muted)] mb-2">
                  이메일 <span className="text-[var(--danger)]">*</span>
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
                  비밀번호 <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-[11px] text-[var(--text-light)] mt-1">
                  8자 이상, 영문/숫자 조합
                </p>
              </div>

              {/* 비밀번호 확인 */}
              <div className="mb-4">
                <label className="block text-[12px] text-[var(--text-muted)] mb-2">
                  비밀번호 확인 <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className="btn btn-primary w-full py-3 text-[14px]"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? "가입 중..." : "회원가입"}
              </button>
            </form>

            {/* 구분선 */}
            <div className="flex items-center gap-3 my-4">
              <span className="flex-1 h-px bg-[var(--border)]" />
              <span className="text-[11px] text-[var(--text-light)]">또는</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
            </div>

            {/* 로그인 링크 */}
            <div className="text-center">
              <span className="text-[13px] text-[var(--text-muted)]">
                이미 계정이 있으신가요?{" "}
              </span>
              <Link
                href="/login"
                className="text-[13px] text-[var(--primary-dark)] font-medium hover:underline"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
