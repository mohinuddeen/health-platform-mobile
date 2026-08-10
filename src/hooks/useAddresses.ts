//hooks/useAddressses.ts
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addressService,
} from "@/src/services/address.service";


export function useAddresses(){
  return useQuery({
    queryKey:["addresses"],
    queryFn:
      addressService.getAddresses,
  });
}

export function useAddAddress(){
  const queryClient =
    useQueryClient();
  return useMutation({
    mutationFn:
      addressService.addAddress,

    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:["addresses"],
      });
    },

  });

}



export function useUpdateAddress(){

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      addressService.updateAddress,


    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey:["addresses"],
      });

    },

  });

}



export function useDeleteAddress(){

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn:
      addressService.deleteAddress,


    onSuccess:()=>{

      queryClient.invalidateQueries({
        queryKey:["addresses"],
      });

    },

  });

}