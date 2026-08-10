//health-platform-mobile/src/services/search.service.ts
import api from "@/src/lib/api"


export interface SearchServiceResult {

  id: string;
  title: string;
  description: string;
  short_description: string | null;
  price: number;
  discount_price: number | null;

  categories?: {
    name: string;
  };

}


export interface SearchCategoryResult {

  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}


export interface SearchPackageResult {

  id: string;
  title: string;
  description: string;
  price: number;
  discount_price: number | null;
  image_url: string;

}


export interface SearchResponse {

  services: SearchServiceResult[];

  categories: SearchCategoryResult[];

  packages: SearchPackageResult[];

}



export const searchService = {

  search: async (
    query: string
  ): Promise<SearchResponse> => {

    const response = await api.get(
      "/public/search/",
      {
        params: {
          q: query,
        },
      }
    );


    return response.data;

  },

};