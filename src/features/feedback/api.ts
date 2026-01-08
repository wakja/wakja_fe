import { instance } from '@/lib/instance';
import type { CreateFeedbackRequest, ApiResponse } from './types';

// POST /api/feedback - 피드백 제출
export const createFeedback = async (
  data: CreateFeedbackRequest
): Promise<ApiResponse<{ id: number }>> => {
  const res = await instance.post('/api/feedback', data);
  return res.data;
};
