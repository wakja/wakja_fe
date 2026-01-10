'use client';

import { useGetMe } from './useGetMe';
import type { User } from '@/features/auth/types';

/**
 * 인증 상태를 확인하는 통합 훅
 * @returns 사용자 정보, 로그인 여부, 로딩 상태
 */
export function useAuth(): {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
} {
  const { data, isLoading, isError } = useGetMe();

  const user = data?.data ?? null;

  return {
    user,
    isLoggedIn: !isError && !!user,
    isLoading,
  };
}
