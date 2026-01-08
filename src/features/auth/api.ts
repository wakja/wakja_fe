import { instance } from "@/lib/instance";
import { AuthResponse, LoginRequest, SignupRequest } from "./types";

/**
 * 로그인
 * @description 이메일과 비밀번호로 인증을 진행하고 세션 쿠키를 발급받습니다.
 * @param {LoginRequest} data - 로그인 정보
 * @param {string} data.email - 사용자 이메일
 * @param {string} data.password - 사용자 비밀번호
 * @throws {401} 이메일 또는 비밀번호가 일치하지 않습니다
 * * @returns {Promise<AuthResponse>} 성공 시 사용자 정보(User) 반환
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await instance.post("/api/auth/login", data);
  return response.data;
};

/**
 * 회원가입
 * @description 새로운 사용자를 등록합니다.
 * @param {SignupRequest} data - 회원가입 정보
 * @param {string} data.email - 이메일 (형식 검증 필수)
 * @param {string} data.password - 비밀번호 (8자 이상, 영문+숫자 혼합)
 * @param {string} data.nickname - 닉네임 (2~12자)
 * @throws {409} 이미 사용 중인 이메일 또는 닉네임입니다
 * * @returns {Promise<AuthResponse>} 성공 시 등록된 사용자 정보 반환
 */
export const signup = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await instance.post("/api/auth/signup", data);
  return response.data;
};

/**
 * 로그아웃
 * @description 현재 세션을 종료하고 인증 쿠키를 제거합니다.
 * * @returns {Promise<{ success: boolean; message: string }>} 로그아웃 결과 메시지
 */
export const logout = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await instance.post("/api/auth/logout");
  return response.data;
};

/**
 * 현재 사용자 정보 조회
 * @auth 인증 필요 (credentials: 'include' 설정 필수)
 * @description 현재 접속 중인 사용자의 세션 정보를 확인하여 사용자 데이터를 가져옵니다.
 * @throws {401} 로그인이 필요합니다
 * * @returns {Promise<{success: boolean}>} 로그인 상태일 경우 사용자 객체 반환
 */
export const getMe = async (): Promise<{ success: boolean }> => {
  const response = await instance.get("/api/auth/me");
  return response.data;
};
