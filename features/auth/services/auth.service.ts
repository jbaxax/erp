import { api } from '@/services/api';
import { handleApiError } from '@/services/error-handler';
import { LoginPayload, LoginResponse, User } from '../models/auth.model';
import Cookies from 'js-cookie';

export async function login(payload: LoginPayload): Promise<{ user: User; token: string }> {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);

    Cookies.set('auth-token', data.data.token, {
      expires: 7,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' // Protección CSRF
    });
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
    Cookies.remove('auth-token', {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  } catch (error) {
    handleApiError(error);
  }
}

export async function me(): Promise<User> {
  try {
    const { data } = await api.get<{ success: boolean; data: User }>('/auth/me');
    return data.data;
  } catch (error) {
    handleApiError(error);
  }
}