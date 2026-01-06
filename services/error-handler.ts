import axios from 'axios';
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      throw new ApiError(
        data?.message || 'Error en la petición',
        status,
        data?.errors
      );
    }
    if (error.request) {
      throw new ApiError('Error de conexión. Verifica tu internet.', 0);
    }
  }
  throw new ApiError('Error inesperado');
}