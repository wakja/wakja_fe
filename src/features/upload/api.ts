import { instance } from "@/lib/instance";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface UploadResponse {
  url: string;
}

/**
 * 이미지 업로드
 * @auth 인증 필요 (credentials: 'include' 필수)
 * @description 파일을 Multipart FormData 형식으로 업로드하고, 스토리지 URL을 반환받습니다.
 * @param {File} file - 업로드할 이미지 파일 (최대 5MB)
 * @param {string} file.type - 허용 형식: jpg, png, gif, webp
 * @throws {400} 허용되지 않는 파일 형식 또는 크기 초과
 * @throws {401} 로그인이 필요합니다
 * * @returns {Promise<ApiResponse<UploadResponse>>} 업로드된 이미지의 공용 URL 반환
 */
export const uploadImage = async (
  file: File
): Promise<ApiResponse<UploadResponse>> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await instance.post("/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
