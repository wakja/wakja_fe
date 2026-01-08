// 사용자 정보
export interface User {
  id: string;
  email: string;
  nickname: string;
}

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 회원가입 요청
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

// 인증 응답
export interface AuthResponse {
  success: boolean;
  data?: User;
  error?: string;
}
