import { PolicialInterface } from "@/interface/Policial/PolicialInterface";
import { policeApi } from "@/utils/police-api";

const endpoint = "/policial";

const PolicialService = {
  getAll: async (): Promise<PolicialInterface[]> => {
    const response = await policeApi(endpoint, "GET");
    return response.json();
  },

  getById: async (id: number): Promise<PolicialInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "GET");
    return response.json();
  },

  findByPosto: async (idPosto: string): Promise<PolicialInterface[]> => {
    const response = await policeApi(`${endpoint}/posto/${idPosto}`, "GET");
    return response.json();
  },

  getPoliciaisAtivos: async (): Promise<any> => {
    const response = await policeApi(`${endpoint}/ativos`, "GET");
    return response.json();
  },

  create: async (policial: Omit<PolicialInterface, "id_policial">): Promise<PolicialInterface> => {
    const response = await policeApi(endpoint, "POST", policial);
    return response.json();
  },

  update: async (id: number, policial: Partial<PolicialInterface>): Promise<PolicialInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "PUT", policial);
    return response.json();
  },

  updatePartial: async (id: number, policialId: number): Promise<PolicialInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "PATCH", {
      id_policial: policialId
    });
    return response.json();
  },

  addPostoPolicial: async (id: number, policialId: number): Promise<PolicialInterface> => {
    const response = await policeApi(`${endpoint}${id}/posto/${id}`, "PATCH", {
      id_policial: policialId
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await policeApi(`${endpoint}/${id}`, "DELETE");
  },
};

export default PolicialService;