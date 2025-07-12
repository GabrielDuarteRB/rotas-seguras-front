// src/services/StatusViaturaService.ts

import { StatusViaturaInterface } from "@/interface/Viatura/ViaturaInterface";
import { policeApi } from "@/utils/police-api";

const endpoint = "/status-viatura";

const StatusViaturaService = {
  getAll: async (): Promise<StatusViaturaInterface[]> => {
    const response = await policeApi(endpoint, "GET");
    return response.json();
  },

  create: async (status: Omit<StatusViaturaInterface, "id_status_viatura">): Promise<StatusViaturaInterface> => {
    const response = await policeApi(endpoint, "POST", status);
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await policeApi(`${endpoint}/${id}`, "DELETE");
  },

  update: async (id: number, data: Partial<StatusViaturaInterface>): Promise<StatusViaturaInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "PATCH", data);
    return response.json();
  },
};

export default StatusViaturaService;
