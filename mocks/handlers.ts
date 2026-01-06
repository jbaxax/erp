import { http, HttpResponse } from 'msw';

// Base URL de tu API simulada
const API_URL = 'http://localhost:3000/api';

// Base de datos simulada (puedes moverla a un archivo separado)
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@erp.com',
    password: 'admin',
    name: 'Admin User',
    roles: ['admin']
  },
  {
    id: '2',
    email: 'vendedor@erp.com',
    password: 'sales',
    name: 'Vendedor Juan',
    roles: ['sales']
  }
];

// Handlers para cada endpoint de tu API
export const handlers = [
  // POST /api/auth/login
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json() as { email: string; password: string };

    // Simulamos latencia de red realista
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validación de credenciales
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return HttpResponse.json(
        { 
          message: 'Credenciales inválidas',
          errors: {
            email: 'Email o contraseña incorrectos'
          }
        },
        { status: 401 }
      );
    }

    // Respuesta exitosa con formato de API REST profesional
    return HttpResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles
        },
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ userId: user.id, email: user.email }))}.fake-signature`
      }
    });
  }),

  // POST /api/auth/logout
  http.post(`${API_URL}/auth/logout`, async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return HttpResponse.json({
      success: true,
      message: 'Sesión cerrada exitosamente'
    });
  }),

  // GET /api/auth/me - Para verificar el usuario actual
  http.get(`${API_URL}/auth/me`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'No autorizado' },
        { status: 401 }
      );
    }

    // Simulamos validación del token
    const token = authHeader.substring(7);
    
    // En un escenario real, aquí validarías el JWT
    // Por ahora, retornamos el primer usuario (admin)
    const user = MOCK_USERS[0];

    return HttpResponse.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
      }
    });
  })
];
