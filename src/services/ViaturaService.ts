import { ViaturaInterface } from "@/interface/Viatura/ViaturaInterface";
import { policeApi } from "@/utils/police-api";

const endpoint = "/viatura";

const ViaturaService = {
  getAll: async (): Promise<ViaturaInterface[]> => {
    const response = await policeApi(endpoint, "GET");
    return response.json();
  },

  getById: async (id: number): Promise<ViaturaInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "GET");
    return response.json();
  },

  getByPlaca: async (placa: string): Promise<ViaturaInterface[]> => {
    const response = await policeApi(`${endpoint}/placa/${placa}`, "GET");
    return response.json();
  },

  getByStatus: async (id_status: number): Promise<ViaturaInterface[]> => {
    const response = await policeApi(`${endpoint}/por-status/${id_status}`, "GET");
    return response.json();
  },

  countByStatus: async (): Promise<any> => {
    const response = await policeApi(`${endpoint}/contar-por-status`, "GET");
    return response.json();
  },

  create: async (viatura: Omit<ViaturaInterface, "id_viatura">): Promise<ViaturaInterface> => {
    const response = await policeApi(endpoint, "POST", viatura);
    return response.json();
  },

  update: async (id: number, viatura: Partial<ViaturaInterface>): Promise<ViaturaInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "PATCH", viatura);
    return response.json();
  },

  changeStatus: async (id: number, statusId: number): Promise<ViaturaInterface> => {
    const response = await policeApi(`${endpoint}/mudar-status/${id}`, "PATCH", {
      id_status: statusId
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await policeApi(`${endpoint}/${id}`, "DELETE");
  },
};

export default ViaturaService;
