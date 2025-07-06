import { policeApi } from "@/utils/police-api"
import type { OcorrenciaGetAllInterface } from '@/interface/Ocorrencia/OcorrenciaGetAllInterface'
import type { OcorrenciaCreateInterface } from '@/interface/Ocorrencia/OcorrenciaCreateInterface'

class OcorrenciaService {

  async getAll(dados: OcorrenciaGetAllInterface) {

    const params = new URLSearchParams(dados as any).toString();
    try {
      const response = await policeApi(
        `/ocorrencias?${params}`,
        'GET',
      );

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

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Falha ao criar as ocorrencias');
    }
  }

}

export default new OcorrenciaService();