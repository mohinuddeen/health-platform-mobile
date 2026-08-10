//health-platform-mobile/app/_layout.tsx
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import StoreProvider from "@/src/providers/store-provider";
import QueryProvider from "@/src/providers/query-provider";
import AuthProvider from "@/src/providers/auth-provider";
export const unstable_settings = {
  anchor: "(tabs)",
};

const HealthcareTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0F766E",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#0F172A",
    border: "#E2E8F0",
    notification: "#16A34A",
  },
};


export default function RootLayout() {

  return (
    <StoreProvider>
      <AuthProvider>

        <QueryProvider>
          <ThemeProvider value={HealthcareTheme}>
            <Stack>

              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="services/index"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="services/[id]"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="packages/index"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="packages/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="bookings/[id]"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="profile/index"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="family-members/index"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="family-members/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="family-members/add"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="addresses/index"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="addresses/add"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="addresses/[id]"
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="modal"
                options={{
                  presentation: "modal",
                  title: "Modal",
                }}
              />

            </Stack>

            <StatusBar style="dark" />
          </ThemeProvider>

        </QueryProvider>
      </AuthProvider>
    </StoreProvider>
  );
}