import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";

import { useRouter } from "expo-router";


import { authService } from "@/src/services/auth.service";


export default function SignupScreen() {

  const router = useRouter();


  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  async function handleSignup() {

    try {

      setLoading(true);
      setError("");


      await authService.signup({
        full_name: fullName,
        phone,
        email,
        password,
      });


      router.replace("/(auth)/login");


    } catch (error) {

      setError(
        "Unable to create account."
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        Create Account
      </Text>



      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />



      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />



      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />



      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />



      {
        error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )
      }



      <Pressable
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}
      >

        {
          loading ? (
            <ActivityIndicator
              color="#FFFFFF"
            />
          ) : (
            <Text style={styles.buttonText}>
              Sign Up
            </Text>
          )
        }


      </Pressable>



      <Pressable
        onPress={() =>
          router.replace("/(auth)/login")
        }
      >

        <Text style={styles.link}>
          Already have an account? Login
        </Text>

      </Pressable>


    </View>

  );

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F8FAFC",
  },


  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    color: "#0F172A",
  },


  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },


  button: {
    backgroundColor: "#0F766E",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },


  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },


  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#0F766E",
    fontWeight: "600",
  },


  error: {
    color: "#DC2626",
    marginBottom: 10,
  },

});