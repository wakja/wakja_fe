'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { updatePost } from '@/features/post';
import { postKeys } from '@/constants/querykeys';
import type { UpdatePostRequest } from '@/features/post/types';

export function useUpdatePost(id: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostRequest) => updatePost(id, data),
    onSuccess: () => {
      // 게시글 상세 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
      // 게시글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      // 수정된 게시글 상세 페이지로 이동
      router.push(`/post/${id}`);
    },
  });
}
