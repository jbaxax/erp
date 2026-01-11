import { http, HttpResponse } from 'msw';

// Simulated API Base URL
// Simulated API Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Simulated database (could be moved to a separate file)
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
    name: 'Sales Rep John',
    roles: ['sales']
  }
];

// Handlers for each API endpoint
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
          message: 'Invalid credentials',
          errors: {
            email: 'Incorrect email or password'
          }
        },
        { status: 401 }
      );
    }

    // Successful response with professional REST API format
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
      message: 'Logged out successfully'
    });
  }),

  // GET /api/auth/me - Verify current user
  http.get(`${API_URL}/auth/me`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
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
