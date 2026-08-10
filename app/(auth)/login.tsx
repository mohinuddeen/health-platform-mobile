//health-platform-mobile/app/(auth)/login.tsx
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

import { useDispatch } from "react-redux";

import { authService } from "@/src/services/auth.service";
import { loginSuccess } from "@/src/store/slices/authSlice";
import { saveAuthData } from "@/src/utils/authStorage";

export default function LoginScreen() {

  const router = useRouter();
  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  async function handleLogin() {

    try {

      setLoading(true);
      setError("");


      const response =
        await authService.login({
          email,
          password,
        });


      dispatch(
        loginSuccess({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          userId: response.user_id,
        })
      );

        await saveAuthData({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        userId: response.user_id,
        });
      router.replace("/(tabs)");

    } catch (error) {

      setError(
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        Login
      </Text>


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
        onPress={handleLogin}
        disabled={loading}
      >

        {
          loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              Login
            </Text>
          )
        }

      </Pressable>



      <Pressable
        onPress={() =>
          router.push("/(auth)/signup")
        }
      >

        <Text style={styles.link}>
          Create account
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