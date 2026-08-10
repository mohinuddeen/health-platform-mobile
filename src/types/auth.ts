//health-platform-mobile/src/types/auth.ts
export interface User {
  id: string;
  email: string;
  full_name: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user_id: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}