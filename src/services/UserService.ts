import { userApi } from "@/utils/user-api"
import type { UserCreateInterface } from '@/interface/User/UserCreateInterface'

class UserService {

  async login(email: String, password: String) {
    try {
      const response = await userApi(
        '/auth/login',
        'POST',
        { email, senha: password },
        { redirectOnUnauthorized: false }
      );

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha no login');
    }
  }

  async getUserByToken () {
    const response = await userApi(`/auth/validate`, 'POST');

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    return await response.json();
  };

  async register (data: UserCreateInterface) {
    try {
      const response = await userApi(
        '/usuarios',
        'POST',
        data,
        { redirectOnUnauthorized: false }
      );

      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha no login');
    }
  }

  async getUserById (id: string) {
    const response = await userApi(`/usuarios/${id}`, 'GET');

    if (!response.ok) {
      throw new Error('Usuário não encontrado');
    }

    return await response.json();
  }
}

export default new UserService();