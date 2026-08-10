//health-platform-mobile/src/hooks/useProfile.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { profileService } from "@/src/services/profile.service";


export function useProfile() {

  return useQuery({

    queryKey: ["profile"],

    queryFn: profileService.getProfile,

  });

}



export function useUpdateProfile() {

  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: profileService.updateProfile,


    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

    },

  });

}