'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/features/post';
import { postKeys } from '@/constants/querykeys';

export function useDeletePost(id: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      // 게시글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      // 목록 페이지로 이동
      router.push('/post');
    },
  });
}
