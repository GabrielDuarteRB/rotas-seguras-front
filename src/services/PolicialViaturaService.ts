import { policeApi } from "@/utils/police-api";
import type { PolicialViaturaCreateInterface } from "@/interface/PolicialViatura/PolicialViaturaCreateInterface";

const endpoint = "/policial-viatura";

const PolicialViaturaService = {
  getAll: async () => {
    const response = await policeApi(endpoint, "GET");
    return response.json();
  },

  create: async (data: PolicialViaturaCreateInterface) => {
    const response = await policeApi(endpoint, "POST", data);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na resposta:", errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    return response.json();
  },

  delete: async (id: number) => {
    const response = await policeApi(`${endpoint}/${id}`, "DELETE");
    return response.json();
  },
};

export default PolicialViaturaService;
