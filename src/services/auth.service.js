import api from './api';
import { env } from '../schemas/env.schema';

export const authService = {
  login: async (credentials) => {
    // Si la app está configurada para funcionar sin backend
    if (env.VITE_AUTH_MODE === 'localstorage') {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Buscar usuario en localStorage o validar admin por defecto
      const usuarioEncontrado = usuarios.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      const esAdminPorDefecto = credentials.email === 'admin@correo.com';

      if (usuarioEncontrado || esAdminPorDefecto) {
        const usuario = usuarioEncontrado || {
          id: 1,
          nombre: 'Administrador',
          email: credentials.email,
          rol: 'ADMIN',
        };

        return {
          token: 'local-demo-token-12345',
          usuario,
        };
      }

      throw new Error('Credenciales inválidas');
    }

    // Si está conectado a una API real
    const response = await api.post('/usuarios/login', credentials);
    return response.data;
  },
};