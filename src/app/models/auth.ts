export interface LoginRequest {
  username: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface LoginResponse {
  message?: string;
  token?: string;
  user?: User;
  success?: boolean;
}

export interface LoginError {
  status: number;
  message: string;
  error: string;
}

export interface User {
  username: string;
  role: 'ADMIN' | 'CUSTOMER';
}
