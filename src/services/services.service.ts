//health-platform-mobile/src/services/services.service.ts
import api from "@/src/lib/api"
import { Service, ServicesResponse } from "@/src/types/service";

export interface GetPublicServicesParams {
  page?: number;
  limit?: number;
  category_id?: string;
}

export const servicesService = {
  getPublicServices: async (params?: GetPublicServicesParams): Promise<ServicesResponse> => {
    const response = await api.get("/public/services/", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        category_id: params?.category_id,
      },
    });

    return response.data;
  },
  getPublicService: async (id: string): Promise<Service> => {
    const response = await api.get(`/public/services/${id}/`);
    return response.data;
  },
};