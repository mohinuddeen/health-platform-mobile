import {
  Alert,
  StyleSheet,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import Header from "@/src/components/layout/Header";
import FamilyMemberForm from "@/src/components/profile/FamilyMemberForm";

import {
  useAddFamilyMember,
} from "@/src/hooks/useFamilyMembers";


export default function AddFamilyMemberScreen() {

  const router = useRouter();

  const addFamilyMember =
    useAddFamilyMember();


  function handleSubmit(data: {
    name: string;
    age: number;
    relation: string;
  }) {

    addFamilyMember.mutate(
      data,
      {
        onSuccess: () => {

          Alert.alert(
            "Success",
            "Family member added successfully"
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

        <FamilyMemberForm
          onSubmit={handleSubmit}
          loading={addFamilyMember.isPending}
          buttonText="Add Family Member"
        />

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