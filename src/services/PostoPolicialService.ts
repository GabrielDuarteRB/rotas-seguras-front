import { PostoPolicialInterface } from "@/interface/PostoPolicial/PostoPolicialInterface";
import { policeApi } from "@/utils/police-api";

const endpoint = "/posto-policial";

const PostoPolicialService = {
  getAll: async (): Promise<PostoPolicialInterface[]> => {
    const response = await policeApi(endpoint, "GET");
    return response.json();
  },

  getById: async (id: number): Promise<PostoPolicialInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "GET");
    return response.json();
  },

  create: async (postopolicial: Omit<PostoPolicialInterface, "id_posto">): Promise<PostoPolicialInterface> => {
    const response = await policeApi(endpoint, "POST", postopolicial);
    return response.json();
  },

  update: async (id: number, postopolicial: Partial<PostoPolicialInterface>): Promise<PostoPolicialInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "PUT", postopolicial);
    return response.json();
  },

  updatePartial: async (id: number, postoId: number): Promise<PostoPolicialInterface> => {
    const response = await policeApi(`${endpoint}/${id}`, "PATCH", {
      id_posto: postoId
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await policeApi(`${endpoint}/${id}`, "DELETE");
  },
};

export default PostoPolicialService;