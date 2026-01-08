import { instance } from '@/lib/instance';
import type { Comment, CreateCommentRequest, UpdateCommentRequest, ApiResponse } from './types';

// GET /api/posts/[id]/comments - 댓글 목록
export const getComments = async (
  postId: number
): Promise<ApiResponse<Comment[]>> => {
  const res = await instance.get(`/api/posts/${postId}/comments`);
  return res.data;
};

// POST /api/posts/[id]/comments - 댓글 작성
export const createComment = async (
  postId: number,
  data: CreateCommentRequest
): Promise<ApiResponse<Comment>> => {
  const res = await instance.post(`/api/posts/${postId}/comments`, data);
  return res.data;
};

// PUT /api/comments/[id] - 댓글 수정
export const updateComment = async (
  commentId: number,
  data: UpdateCommentRequest
): Promise<ApiResponse<Comment>> => {
  const res = await instance.put(`/api/comments/${commentId}`, data);
  return res.data;
};

// DELETE /api/comments/[id] - 댓글 삭제
export const deleteComment = async (
  commentId: number
): Promise<ApiResponse<null>> => {
  const res = await instance.delete(`/api/comments/${commentId}`);
  return res.data;
};
