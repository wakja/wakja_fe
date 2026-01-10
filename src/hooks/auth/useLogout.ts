'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { logout } from '@/features/auth';
import { authKeys } from '@/constants/querykeys';
import { removeToken } from '@/lib/tokenManager';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 저장된 토큰 제거
      removeToken();

      // 로그아웃 시 모든 쿼리 캐시 제거
      queryClient.clear();
      router.push('/');
    },
  });
}
