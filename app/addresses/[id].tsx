// health-platform-mobile/app/addresses/[id].tsx
import {
  Alert,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/src/components/layout/Header";
import AddressForm from "@/src/components/profile/AddressForm";
import { useAddresses, useUpdateAddress } from "@/src/hooks/useAddresses";
import { Colors, Spacing, Typography } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function EditAddressScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: addresses = [], isLoading } = useAddresses();
  const updateAddress = useUpdateAddress();

  const address = addresses.find((item) => item.id === id);

  function handleSubmit(data: any) {
    if (!id) return;

    updateAddress.mutate(
      { id, data },
      {
        onSuccess: () => {
          Alert.alert("Success", "Address updated successfully", [
            { text: "OK", onPress: () => router.back() },
          ]);
        },
        onError: (error: any) => {
          Alert.alert(
            "Error",
            error.response?.data?.message || "Failed to update address"
          );
        },
      }
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (!address) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Address not found</Text>
      </View>
    );
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
            <Ionicons name="create-outline" size={32} color={Colors.light.primary} />
            <Text style={styles.headerTitleText}>Edit Address</Text>
            <Text style={styles.headerSubtitleText}>Update your address details</Text>
          </View>

          <AddressForm
            initialData={address}
            onSubmit={handleSubmit}
            loading={updateAddress.isPending}
            buttonText="Update Address"
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  errorText: {
    fontSize: Typography.size.base,
    color: Colors.light.danger,
  },
});