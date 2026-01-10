'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '@/features/comment';
import { commentKeys } from '@/constants/querykeys';
import type { UpdateCommentRequest } from '@/features/comment/types';

export function useUpdateComment(postId: number, commentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCommentRequest) =>
      updateComment(commentId, data),
    onSuccess: () => {
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
    },
  });
}
