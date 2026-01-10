'use client';

import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/features/auth';
import { authKeys } from '@/constants/querykeys';

export function useGetMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
  });
}
