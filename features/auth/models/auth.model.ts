export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}
export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
}
