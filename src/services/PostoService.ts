import { policeApi } from "@/utils/police-api";
import type { PostoCreateInterface } from "@/interface/Posto/PostoCreateInterface";
import type { PostoGetAllInterface } from "@/interface/Posto/PostoGetAllInterface";

class PostoService {
  async getAll(filtros: PostoGetAllInterface = {}) {
    const params = new URLSearchParams(filtros as any).toString();

    try {
      const response = await policeApi(`/rota?${params}`, 'GET');

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Erro ao buscar postos:", error);
      throw new Error(error.message || 'Falha ao buscar os postos');
    }
  }

  async create(dados: PostoCreateInterface) {
    try {
      const response = await policeApi(`/rota`, 'POST', dados);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Erro ao criar posto:", error);
      throw new Error(error.message || 'Falha ao criar o posto');
    }
  }

  async update(id: number, dados: Partial<PostoCreateInterface>) {
    try {
      const response = await policeApi(`/rota/${id}`, 'PUT', dados);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Erro ao atualizar posto:", error);
      throw new Error(error.message || 'Falha ao atualizar o posto');
    }
  }

  async delete(id: number) {
    try {
      const response = await policeApi(`/rota/${id}`, 'DELETE');

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Erro ao deletar posto:", error);
      throw new Error(error.message || 'Falha ao remover o posto');
    }
  }
}

export default new PostoService();
