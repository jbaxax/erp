export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      roles: string[];
    };
    token: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
}