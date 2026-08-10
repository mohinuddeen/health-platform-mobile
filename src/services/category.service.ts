//health-platform-mobile/src/services/category.service.ts

import api from "@/src/lib/api"
import { Category } from "@/src/types/category";

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get("/public/categories/");
    // Handle both array and paginated response
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && response.data.results) {
      return response.data.results;
    }
    return response.data || [];
  },
};