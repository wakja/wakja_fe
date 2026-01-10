"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth";
import { authKeys } from "@/constants/querykeys";
import { setToken } from "@/lib/tokenManager";
import type { LoginRequest } from "@/features/auth/types";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      // 로그인 성공 시 토큰 저장
      let token: string | undefined;

      if (typeof response.token === "string") {
        token = response.token;
      } else if (typeof response.data?.token === "string") {
        token = response.data.token;
      }

      if (token) {
        setToken(token);
      }

      // 사용자 정보 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      router.push("/post");
    },
  });
}
