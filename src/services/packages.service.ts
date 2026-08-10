//health-platform-mobile/src/services/packages.service.ts
import api from "@/src/lib/api"
import { Package } from "@/src/types/package";

export const packagesService = {

  getPackages: async (): Promise<Package[]> => {
    const response = await api.get("/public/packages/");
    return response.data;
  },


  getPackage: async (id: string): Promise<Package> => {
    const response = await api.get(`/public/packages/${id}/`);
    return response.data;
  },

};