//health-platform-mobile/src/services/auth.service.ts
import api from "@/src/lib/api"

import {
  LoginResponse,
  RefreshResponse,
} from "@/src/types/auth";


interface SignupData {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}


interface LoginData {
  email: string;
  password: string;
}


export const authService = {


  signup: async (
    data: SignupData
  ) => {

    const response = await api.post(
      "/auth/signup/",
      data
    );

    return response.data;
  },


  login: async (
    data: LoginData
  ): Promise<LoginResponse> => {

    const response = await api.post(
      "/auth/login/",
      data
    );

    return response.data;
  },


  refresh: async (
    refresh_token:string
  ):Promise<RefreshResponse> => {

    const response = await api.post(
      "/auth/refresh/",
      {
        refresh_token
      }
    );

    return response.data;
  },


  logout: async () => {

    const response = await api.post(
      "/auth/logout/"
    );

    return response.data;
  },


};