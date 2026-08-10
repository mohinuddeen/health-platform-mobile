//health-platform-mobile/src/services/family.service.ts
import api from "@/src/lib/api"


export interface FamilyMember {

  id: string;

  name: string;

  age: number;

  relation: string;

}



export interface FamilyMemberInput {

  name: string;

  age: number;

  relation: string;

}



export const familyService = {


  getFamilyMembers: async (): Promise<FamilyMember[]> => {

    const response = await api.get(
      "/profile/family-members/"
    );

    return response.data;

  },



  addFamilyMember: async (
    data: FamilyMemberInput
  ) => {

    const response = await api.post(
      "/profile/family-members/",
      data
    );

    return response.data;

  },



  updateFamilyMember: async ({
    id,
    data,
  }: {
    id: string;
    data: FamilyMemberInput;
  }) => {

    const response = await api.put(
      `/profile/family-members/${id}/`,
      data
    );

    return response.data;

  },



  deleteFamilyMember: async (
    id: string
  ) => {

    const response = await api.delete(
      `/profile/family-members/${id}/`
    );

    return response.data;

  },


};