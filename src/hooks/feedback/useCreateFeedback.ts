'use client';

import { useMutation } from '@tanstack/react-query';
import { createFeedback } from '@/features/feedback';
import type { CreateFeedbackRequest } from '@/features/feedback/types';

export function useCreateFeedback() {
  return useMutation({
    mutationFn: (data: CreateFeedbackRequest) => createFeedback(data),
  });
}
