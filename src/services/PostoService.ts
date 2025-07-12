import { policeApi } from "@/utils/police-api";
import type { PostoCreateInterface } from "@/interface/Posto/PostoCreateInterface";
import type { PostoGetAllInterface } from "@/interface/Posto/PostoGetAllInterface";

class PostoService {
  async getAll(filtros: PostoGetAllInterface = {}) {
    const params = new URLSearchParams(filtros as any).toString();

    try {
      const response = await policeApi(`/rotas?${params}`, 'GET');

      if (!response.ok) {
        throw new Error('Erro ao buscar os postos');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao buscar os postos');
    }
  }

  async create(dados: PostoCreateInterface) {
    try {
      const response = await policeApi(`/rotas`, 'POST', dados);

      if (!response.ok) {
        throw new Error('Erro ao criar o posto');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao criar o posto');
    }
  }

  async update(id: number, dados: Partial<PostoCreateInterface>) {
    try {
      const response = await policeApi(`/rotas/${id}`, 'PUT', dados);

      if (!response.ok) {
        throw new Error('Erro ao atualizar o posto');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao atualizar o posto');
    }
  }

  async delete(id: number) {
    try {
      const response = await policeApi(`/rotas/${id}`, 'DELETE');

      if (!response.ok) {
        throw new Error('Erro ao remover o posto');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao remover o posto');
    }
  }
}

export default new PostoService();
