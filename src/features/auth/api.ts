import { instance } from "@/lib/instance";
import { AuthResponse, LoginRequest, SignupRequest, User } from "./types";

// 로그인
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await instance.post("/api/auth/login", data);
  return response.data;
};

// 회원가입
export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await instance.post("/api/auth/signup", data);
  return response.data;
};

// 로그아웃
export const logout = async (): Promise<{ success: boolean }> => {
  const response = await instance.post("/api/auth/logout");
  return response.data;
};

// 유저 정보 조회
export const getMe = async (): Promise<{ success: boolean; data?: User }> => {
  const response = await instance.get("/api/auth/me");
  return response.data;
};
