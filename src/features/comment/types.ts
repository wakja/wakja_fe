// 댓글
export interface Comment {
  id: number;
  author_nickname: string;
  content: string;
  created_at: string;
  is_owner: boolean;
}

// 댓글 작성 요청
export interface CreateCommentRequest {
  content: string;
}

// 댓글 수정 요청
export interface UpdateCommentRequest {
  content: string;
}

// API 응답
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
