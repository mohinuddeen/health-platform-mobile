import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";

import {
  FamilyMember,
} from "@/src/types/family";


interface FamilyMemberInput {

  name: string;

  age: number;

  relation: string;

}


interface Props {

  initialData?: FamilyMember;

  onSubmit: (
    data: FamilyMemberInput
  ) => void;

  loading?: boolean;

  buttonText: string;

}



export default function FamilyMemberForm({
  initialData,
  onSubmit,
  loading,
  buttonText,
}: Props) {


  const [form, setForm] =
    useState<FamilyMemberInput>({

      name:
        initialData?.name ?? "",

      age:
        initialData?.age ?? 0,

      relation:
        initialData?.relation ?? "",

    });



  function updateField(
    key: keyof FamilyMemberInput,
    value: string
  ) {

    setForm((prev: FamilyMemberInput) => ({

      ...prev,

      [key]:
        key === "age"
          ? Number(value)
          : value,

    }));

  }



  return (

    <View style={styles.container}>


      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(value) =>
          updateField(
            "name",
            value
          )
        }
      />



      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={
          form.age === 0
            ? ""
            : String(form.age)
        }
        onChangeText={(value) =>
          updateField(
            "age",
            value
          )
        }
      />



      <TextInput
        style={styles.input}
        placeholder="Relation"
        value={form.relation}
        onChangeText={(value) =>
          updateField(
            "relation",
            value
          )
        }
      />



      <Pressable
        style={styles.button}
        disabled={loading}
        onPress={() =>
          onSubmit(form)
        }
      >

        <Text style={styles.buttonText}>

          {
            loading
              ? "Saving..."
              : buttonText
          }

        </Text>

      </Pressable>


    </View>

  );

}



const styles = StyleSheet.create({

  container:{
    gap:12,
  },


  input:{
    backgroundColor:"#FFFFFF",
    borderWidth:1,
    borderColor:"#E2E8F0",
    borderRadius:10,
    padding:12,
    color:"#0F172A",
  },


  button:{
    backgroundColor:"#0F766E",
    padding:14,
    borderRadius:10,
    alignItems:"center",
    marginTop:10,
  },


  buttonText:{
    color:"#FFFFFF",
    fontWeight:"700",
  },

});