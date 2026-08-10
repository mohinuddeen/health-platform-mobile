import {
  Alert,
  StyleSheet,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import Header from "@/src/components/layout/Header";
import FamilyMemberForm from "@/src/components/profile/FamilyMemberForm";

import {
  useFamilyMembers,
  useUpdateFamilyMember,
} from "@/src/hooks/useFamilyMembers";


export default function EditFamilyMemberScreen() {

  const router = useRouter();

  const {
    id,
  } = useLocalSearchParams<{
    id: string;
  }>();


  const {
    data: familyMembers = [],
  } = useFamilyMembers();


  const updateFamilyMember =
    useUpdateFamilyMember();


  const familyMember =
    familyMembers.find(
      (item) => item.id === id
    );


  function handleSubmit(data: {
    name: string;
    age: number;
    relation: string;
  }) {

    if (!id) {
      return;
    }


    updateFamilyMember.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: () => {

          Alert.alert(
            "Success",
            "Family member updated successfully"
          );

          router.back();

        },
      }
    );

  }


  return (

    <View style={styles.screen}>

      <Header />

      <View style={styles.container}>

        {
          familyMember && (
            <FamilyMemberForm
              initialData={familyMember}
              onSubmit={handleSubmit}
              loading={
                updateFamilyMember.isPending
              }
              buttonText="Update Family Member"
            />
          )
        }

      </View>

    </View>

  );

}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    padding: 16,
  },

});