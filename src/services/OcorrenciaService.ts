import { policeApi } from "@/utils/police-api"
import type { OcorrenciaGetAllInterface } from '@/interface/Ocorrencia/OcorrenciaGetAllInterface'
import type { OcorrenciaCreateInterface } from '@/interface/Ocorrencia/OcorrenciaCreateInterface'

class OcorrenciaService {

  async getAll(dados: OcorrenciaGetAllInterface = {}) {

    const params = new URLSearchParams(dados as any).toString();
    try {
      const response = await policeApi(
        `/ocorrencias?${params}`,
        'GET',
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar as ocorrencias');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao buscar as ocorrencias');
    }
  }

  async create(dados: OcorrenciaCreateInterface) {
    try {
      const response = await policeApi(
        `/ocorrencias`,
        'POST',
        dados
      );

      if (!response.ok) {
        throw new Error('Erro ao criar ocorrencia');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao criar as ocorrencias');
    }
  }

  async update(id: number, dados: Partial<OcorrenciaCreateInterface>) {
    try {
      const response = await policeApi(
        `/ocorrencias/${id}`,
        'PUT',
        dados
      );

      if (!response.ok) {
        throw new Error('Ocorrencia  não atualizada');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao atualizar a ocorrencia');
    }
  }

}

export default new OcorrenciaService();