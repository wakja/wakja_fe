import { instance } from "@/lib/instance";
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
  ApiResponse,
} from "./types";

/**
 * 댓글 목록 조회
 * @description 특정 게시글에 작성된 모든 댓글 목록을 가져옵니다.
 * @param {number} postId - 게시글 고유 ID
 * * @returns {Promise<ApiResponse<Comment[]>>} 해당 게시글의 댓글 리스트 반환
 */
export const getComments = async (
  postId: number
): Promise<ApiResponse<Comment[]>> => {
  const res = await instance.get(`/api/posts/${postId}/comments`);
  return res.data;
};

/**
 * 댓글 작성
 * @auth 인증 필요 (credentials: 'include' 필수)
 * @description 특정 게시글에 새로운 댓글을 남깁니다.
 * @param {number} postId - 게시글 고유 ID
 * @param {CreateCommentRequest} data - 댓글 내용
 * @param {string} data.content - 댓글 본문 (최대 1000자)
 * @throws {401} 로그인이 필요합니다
 * * @returns {Promise<ApiResponse<Comment>>} 생성된 댓글 정보 반환
 */
export const createComment = async (
  postId: number,
  data: CreateCommentRequest
): Promise<ApiResponse<Comment>> => {
  const res = await instance.post(`/api/posts/${postId}/comments`, data);
  return res.data;
};

/**
 * 댓글 수정
 * @auth 인증 필요 (작성자만 가능)
 * @description 작성한 댓글의 내용을 수정합니다.
 * @param {number} commentId - 댓글 고유 ID
 * @param {UpdateCommentRequest} data - 수정할 내용
 * @param {string} data.content - 수정할 댓글 본문
 * @throws {403} 수정 권한이 없습니다
 * * @returns {Promise<ApiResponse<Comment>>} 수정된 댓글 정보 반환
 */
export const updateComment = async (
  commentId: number,
  data: UpdateCommentRequest
): Promise<ApiResponse<Comment>> => {
  const res = await instance.put(`/api/comments/${commentId}`, data);
  return res.data;
};

/**
 * 댓글 삭제
 * @auth 인증 필요 (작성자만 가능)
 * @description 특정 댓글을 삭제합니다.
 * @param {number} commentId - 댓글 고유 ID
 * @throws {403} 삭제 권한이 없습니다
 * * @returns {Promise<ApiResponse<null>>} 성공 여부 반환
 */
export const deleteComment = async (
  commentId: number
): Promise<ApiResponse<null>> => {
  const res = await instance.delete(`/api/comments/${commentId}`);
  return res.data;
};
