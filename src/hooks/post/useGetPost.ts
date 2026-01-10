'use client';

import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/features/post';
import { postKeys } from '@/constants/querykeys';

export function useGetPost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
    enabled: !!id,
  });
}
