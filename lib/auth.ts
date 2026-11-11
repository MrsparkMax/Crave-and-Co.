// lib/auth.ts
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function setAccessToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
  }
}

// Alias setTokens to setAccessToken to resolve import errors across components
export const setTokens = setAccessToken;

export function removeTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}