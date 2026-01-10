// 게시글 목록 아이템
export interface PostListItem {
  id: number;
  title: string | null;
  author_nickname: string;
  created_at: string;
  view_count: number;
  like_count: number;
  comment_count: number;
}

// 게시글 상세
export interface PostDetail {
  id: number;
  title: string | null;
  content: string;
  author_nickname: string;
  author_id: string;
  created_at: string;
  view_count: number;
  like_count: number;
  is_owner: boolean;
  is_liked: boolean;
  images?: string[];
}

// 게시글 작성 요청
export interface CreatePostRequest {
  title?: string;
  content: string;
  images?: string[];
}

// 게시글 수정 요청
export interface UpdatePostRequest {
  title?: string;
  content?: string;
  images?: string[];
}

// 페이지네이션 응답
export interface PaginatedResponse<T> {
  posts: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// 게시글 목록 파라미터
export interface PostListParams {
  page?: number;
  per_page?: number;
  search?: string;
}

// API 응답
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
