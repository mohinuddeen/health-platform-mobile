// health-platform-mobile/app/addresses/add.tsx
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/src/components/layout/Header";
import AddressForm from "@/src/components/profile/AddressForm";
import { useAddAddress } from "@/src/hooks/useAddresses";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function AddAddressScreen() {
  const router = useRouter();
  const addAddress = useAddAddress();

  function handleSubmit(data: any) {
    addAddress.mutate(data, {
      onSuccess: () => {
        Alert.alert("Success", "Address added successfully", [
          { text: "OK", onPress: () => router.back() },
        ]);
      },
      onError: (error: any) => {
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to add address"
        );
      },
    });
  }

  return (
    <View style={styles.screen}>
      <Header />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Ionicons name="location-outline" size={32} color={Colors.light.primary} />
            <Text style={styles.headerTitleText}>Add New Address</Text>
            <Text style={styles.headerSubtitleText}>Fill in the details below</Text>
          </View>

          <AddressForm
            onSubmit={handleSubmit}
            loading={addAddress.isPending}
            buttonText="Add Address"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  headerTitleText: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    marginTop: Spacing.sm,
  },
  headerSubtitleText: {
    fontSize: Typography.size.base,
    color: Colors.light.textMuted,
    marginTop: Spacing.xs,
  },
});