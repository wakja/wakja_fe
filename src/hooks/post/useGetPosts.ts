'use client';

import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/features/post';
import { postKeys } from '@/constants/querykeys';

export function useGetPosts(page = 1, search?: string) {
  return useQuery({
    queryKey: postKeys.list(page, search),
    queryFn: () => getPosts({ page, search }),
  });
}
