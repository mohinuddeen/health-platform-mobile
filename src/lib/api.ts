//health-platform-mobile/src/lib/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 ||
        error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = await AsyncStorage.getItem(
        "refresh_token"
      );

      if (!refreshToken) {
        await AsyncStorage.clear();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh/`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        await AsyncStorage.setItem(
          "access_token",
          newAccessToken
        );

        if (newRefreshToken) {
          await AsyncStorage.setItem(
            "refresh_token",
            newRefreshToken
          );
        }

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        await AsyncStorage.clear();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;