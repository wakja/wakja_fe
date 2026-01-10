'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '@/features/post';
import { postKeys } from '@/constants/querykeys';
import type { PostDetail } from '@/features/post/types';

export function useToggleLike(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLike(postId),
    onMutate: async () => {
      // 낙관적 업데이트를 위해 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: postKeys.detail(postId) });

      // 이전 데이터 백업
      const previousPost = queryClient.getQueryData<{ data: PostDetail }>(
        postKeys.detail(postId)
      );

      // 낙관적 업데이트
      if (previousPost) {
        queryClient.setQueryData(postKeys.detail(postId), {
          ...previousPost,
          data: {
            ...previousPost.data,
            like_count: previousPost.data.is_liked
              ? previousPost.data.like_count - 1
              : previousPost.data.like_count + 1,
            is_liked: !previousPost.data.is_liked,
          },
        });
      }

      return { previousPost };
    },
    onError: (_err, _variables, context) => {
      // 에러 발생 시 이전 데이터로 복원
      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(postId), context.previousPost);
      }
    },
    onSettled: () => {
      // 성공/실패 여부와 관계없이 쿼리 다시 가져오기
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}
