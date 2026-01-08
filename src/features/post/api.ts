import { instance } from "@/lib/instance";
import type {
  PostListItem,
  PostDetail,
  CreatePostRequest,
  UpdatePostRequest,
  PaginatedResponse,
  PostListParams,
  ApiResponse,
} from "./types";

// GET /api/posts - 게시글 목록 (페이지네이션, 검색)
export const getPosts = async (
  params?: PostListParams
): Promise<ApiResponse<PaginatedResponse<PostListItem>>> => {
  const res = await instance.get("/api/posts", { params });
  return res.data;
};

// POST /api/posts - 게시글 작성
export const createPost = async (
  data: CreatePostRequest
): Promise<ApiResponse<{ id: number }>> => {
  const res = await instance.post("/api/posts", data);
  return res.data;
};

// GET /api/posts/[id] - 게시글 상세
export const getPost = async (id: number): Promise<ApiResponse<PostDetail>> => {
  const res = await instance.get(`/api/posts/${id}`);
  return res.data;
};

// PUT /api/posts/[id] - 게시글 수정
export const updatePost = async (
  id: number,
  data: UpdatePostRequest
): Promise<ApiResponse<PostDetail>> => {
  const res = await instance.put(`/api/posts/${id}`, data);
  return res.data;
};

// DELETE /api/posts/[id] - 게시글 삭제
export const deletePost = async (id: number): Promise<ApiResponse<null>> => {
  const res = await instance.delete(`/api/posts/${id}`);
  return res.data;
};

// POST /api/posts/[id]/like - 좋아요 토글
export const toggleLike = async (
  id: number
): Promise<ApiResponse<{ liked: boolean; like_count: number }>> => {
  const res = await instance.post(`/api/posts/${id}/like`);
  return res.data;
};
