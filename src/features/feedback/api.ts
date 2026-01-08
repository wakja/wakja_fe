import { instance } from "@/lib/instance";
import type { CreateFeedbackRequest, ApiResponse } from "./types";

/**
 * 피드백 제출
 * @description 서비스 이용 중 발생한 버그나 개선 제안을 제출합니다. (비로그인 가능)
 * @param {CreateFeedbackRequest} data - 피드백 데이터
 * @param {'bug' | 'suggestion' | 'other'} data.type - 피드백 유형
 * @param {string} data.content - 피드백 내용 (최대 2000자)
 * @throws {400} 필수 필드 누락 또는 글자 수 초과 시 발생
 * * @returns {Promise<ApiResponse<{ id: number }>>} 제출 완료된 피드백의 ID 반환
 */
export const createFeedback = async (
  data: CreateFeedbackRequest
): Promise<ApiResponse<{ id: number }>> => {
  const res = await instance.post("/api/feedback", data);
  return res.data;
};
