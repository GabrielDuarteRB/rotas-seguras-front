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

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha no login');
    }
  }

  async getUserByToken (id: string) {
    const response = await userApi(`/usuarios/${id}`);

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

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha no login');
    }
  }
}

export default new UserService();