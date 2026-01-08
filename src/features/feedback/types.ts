// 피드백 타입
export type FeedbackType = 'bug' | 'suggestion' | 'other';

// 피드백 작성 요청
export interface CreateFeedbackRequest {
  type: FeedbackType;
  content: string;
}

// 피드백
export interface Feedback {
  id: number;
  type: FeedbackType;
  content: string;
  user_id: string | null;
  created_at: string;
}

// API 응답
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
