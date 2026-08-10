//health-platform-mobile/src/hooks/useFamilyMembers.ts
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  familyService,
} from "@/src/services/family.service";



export function useFamilyMembers() {


  return useQuery({

    queryKey: ["family-members"],

    queryFn:
      familyService.getFamilyMembers,

  });


}



export function useAddFamilyMember() {


  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      familyService.addFamilyMember,


    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          "family-members"
        ],

      });

    },

  });


}

export function useUpdateFamilyMember() {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      familyService.updateFamilyMember,


    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          "family-members"
        ],

      });

    },

  });

}


export function useDeleteFamilyMember() {


  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      familyService.deleteFamilyMember,


    onSuccess: () => {

      queryClient.invalidateQueries({

        queryKey: [
          "family-members"
        ],

      });

    },

  });


}