'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from '@/features/comment';
import { commentKeys, postKeys } from '@/constants/querykeys';
import type { CreateCommentRequest } from '@/features/comment/types';

export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) => createComment(postId, data),
    onSuccess: () => {
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
      // 게시글 상세 쿼리 무효화 (댓글 수 업데이트)
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}
