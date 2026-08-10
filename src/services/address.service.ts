//service/address.service.ts
import api from "@/src/lib/api"
import {
  Address,
  AddressInput,
} from "@/src/types/address";


export const addressService = {

  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get(
      "/profile/addresses/"
    );

    return response.data;
  },


  addAddress: async (
    data: AddressInput
  ) => {

    const response = await api.post(
      "/profile/addresses/",
      data
    );

    return response.data;
  },


  updateAddress: async ({
    id,
    data,
  }: {
    id:string;
    data:AddressInput;
  }) => {

    const response = await api.put(
      `/profile/addresses/${id}/`,
      data
    );

    return response.data;
  },


  deleteAddress: async (
    id:string
  ) => {

    const response = await api.delete(
      `/profile/addresses/${id}/`
    );

    return response.data;
  },

};