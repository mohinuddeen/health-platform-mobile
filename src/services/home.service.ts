//health-platform-mobile/src/services/home.service.ts
import api from "@/src/lib/api"
import { HomeData } from "@/src/types/home";

export const homeService = {
  getHomeData: async (): Promise<HomeData> => {
    const response = await api.get("/public/home/");
    return response.data;
  },
};