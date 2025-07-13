import { policeApi } from "@/utils/police-api"
import type { PolicialGetAllInterface } from '@/interface/Policial/PolicialGetAllInterface'
import type { PolicialCreateInterface } from '@/interface/Policial/PolicialCreateInterface'

class PolicialService {

  async getAll(dados: PolicialGetAllInterface = {}) {

    const params = new URLSearchParams(dados as any).toString();
    try {
      const response = await policeApi(
        `/policiais?${params}`,
        'GET',
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar as policiais');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao buscar as policiais');
    }
  }

  async create(dados: PolicialCreateInterface) {
    try {
      const response = await policeApi(
        `/policiais`,
        'POST',
        dados
      );

      if (!response.ok) {
        throw new Error('Erro ao criar policial');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao criar o policial');
    }
  }

  async update(id: number, dados: Partial<PolicialCreateInterface>) {
    try {
      const response = await policeApi(
        `/policiais/${id}`,
        'PUT',
        dados
      );

      if (!response.ok) {
        throw new Error('Policial não atualizado');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao atualizar o policial');
    }
  }

}

export default new PolicialService();