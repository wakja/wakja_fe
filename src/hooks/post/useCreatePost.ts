'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createPost } from '@/features/post';
import { postKeys } from '@/constants/querykeys';
import type { CreatePostRequest } from '@/features/post/types';

export function useCreatePost() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: (response) => {
      // 게시글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      // 작성된 게시글 상세 페이지로 이동
      if (response.data) {
        router.push(`/post/${response.data.id}`);
      }
    },
  });
}
