import { instance } from "@/lib/instance";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface UploadResponse {
  url: string;
}

// POST /api/upload - 이미지 업로드
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
