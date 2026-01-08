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

/**
 * 게시글 목록 조회
 * @description 페이지네이션 및 검색어를 통해 게시글 목록을 가져옵니다.
 * @param {PostListParams} [params] - 조회 필터 및 페이지네이션 파라미터
 * @returns {Promise<ApiResponse<PaginatedResponse<PostListItem>>>}
 */
export const getPosts = async (
  params?: PostListParams
): Promise<ApiResponse<PaginatedResponse<PostListItem>>> => {
  const res = await instance.get("/api/posts", { params });
  return res.data;
};

/**
 * 게시글 상세 조회
 * @description 특정 ID의 게시글 상세 정보와 본인 확인(is_owner) 여부를 가져옵니다.
 * @param {number} id - 게시글 ID
 */
export const getPost = async (id: number): Promise<ApiResponse<PostDetail>> => {
  const res = await instance.get(`/api/posts/${id}`);
  return res.data;
};

/**
 * 게시글 작성
 * @auth 인증 필요
 * @param {CreatePostRequest} data - 제목(선택) 및 마크다운 본문(필수)
 * @returns {Promise<ApiResponse<{ id: number }>>} 생성된 게시글 ID
 */
export const createPost = async (
  data: CreatePostRequest
): Promise<ApiResponse<{ id: number }>> => {
  const res = await instance.post("/api/posts", data);
  return res.data;
};

/**
 * 게시글 수정
 * @auth 인증 필요 (작성자만)
 * @param {number} id - 게시글 ID
 * @param {UpdatePostRequest} data - 수정할 제목 및 내용
 */
export const updatePost = async (
  id: number,
  data: UpdatePostRequest
): Promise<ApiResponse<PostDetail>> => {
  const res = await instance.put(`/api/posts/${id}`, data);
  return res.data;
};

/**
 * 게시글 삭제
 * @auth 인증 필요 (작성자만)
 * @param {number} id - 게시글 ID
 */
export const deletePost = async (id: number): Promise<ApiResponse<null>> => {
  const res = await instance.delete(`/api/posts/${id}`);
  return res.data;
};

/**
 * 좋아요 (지껄) 토글
 * @description 좋아요를 추가하거나 취소합니다. (1인 1회 제한)
 * @param {number} id - 게시글 ID
 */
export const toggleLike = async (
  id: number
): Promise<ApiResponse<{ liked: boolean; like_count: number }>> => {
  const res = await instance.post(`/api/posts/${id}/like`);
  return res.data;
};
