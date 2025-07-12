import { policeApi } from "@/utils/police-api";
import { StatusViaturaInterface } from "@/interface/Viatura/StatusViaturaInterface";

const endpoint = "/status-viatura";

const StatusViaturaService = {
  getAll: async (): Promise<StatusViaturaInterface[]> => {
    const response = await policeApi(endpoint, "GET");
    return response.json();
  },
};

export default StatusViaturaService;
