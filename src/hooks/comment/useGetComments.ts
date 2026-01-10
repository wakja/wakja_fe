'use client';

import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/features/comment';
import { commentKeys } from '@/constants/querykeys';

export function useGetComments(postId: number) {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
}
