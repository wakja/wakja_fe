const TOKEN_KEY = "wakja_auth_token";

/**
 * 저장된 JWT 토큰을 조회합니다.
 * @returns {string | null} 저장된 토큰 또는 null
 */
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * JWT 토큰을 localStorage에 저장합니다.
 * @param {string} token - 저장할 JWT 토큰
 */
export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * 저장된 JWT 토큰을 제거합니다.
 */
export const removeToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};
