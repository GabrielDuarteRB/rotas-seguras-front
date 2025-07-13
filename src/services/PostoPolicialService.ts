import { policeApi } from "@/utils/police-api"
import type { PostoPolicialGetAllInterface } from '@/interface/PostoPolicial/PostoPolicialGetAllInterface'
import type { PostoPolicialCreateInterface } from '@/interface/PostoPolicial/PostoPolicialCreateInterface'

class PostoPolicialService {

  async getAll(dados: PostoPolicialGetAllInterface = {}) {

    const params = new URLSearchParams(dados as any).toString();
    try {
      const response = await policeApi(
        `/postos?${params}`,
        'GET',
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar os postos policiais');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao buscar os postos');
    }
  }

  async create(dados: PostoPolicialCreateInterface) {
    try {
      const response = await policeApi(
        `/postopoliciais`,
        'POST',
        dados
      );

      if (!response.ok) {
        throw new Error('Erro ao criar posto policial');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao criar o posto policial');
    }
  }

  async update(id: number, dados: Partial<PostoPolicialCreateInterface>) {
    try {
      const response = await policeApi(
        `/postopoliciais/${id}`,
        'PUT',
        dados
      );

      if (!response.ok) {
        throw new Error('Posto não atualizado');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao atualizar o posto policial');
    }
  }

}

export default new PostoPolicialService();