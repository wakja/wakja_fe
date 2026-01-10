'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/features/comment';
import { commentKeys, postKeys } from '@/constants/querykeys';

export function useDeleteComment(postId: number, commentId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
      // 게시글 상세 쿼리 무효화 (댓글 수 업데이트)
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}
