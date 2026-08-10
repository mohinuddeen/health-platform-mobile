//health-platform-mobile/src/services/profile.service.ts
import api from "@/src/lib/api"
import { Profile } from "@/src/types/profile";

interface UpdateProfileData {
  full_name: string;
  phone: string;
}

export const profileService = {
  getProfile: async (): Promise<Profile> => {
    const response = await api.get("/profile/");
    return response.data;
  },

  updateProfile: async (
    data: UpdateProfileData
  ) => {
    const response = await api.put(
      "/profile/update/",
      data
    );

    return response.data;
  },
};