// health-platform-mobile/src/components/profile/AddressForm.tsx
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Address, AddressInput } from "@/src/types/address";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  initialData?: Address;
  onSubmit: (data: AddressInput) => void;
  loading?: boolean;
  buttonText: string;
}

export default function AddressForm({
  initialData,
  onSubmit,
  loading,
  buttonText,
}: Props) {
  const [form, setForm] = useState<AddressInput>({
    title: initialData?.title ?? "",
    address_line: initialData?.address_line ?? "",
    area: initialData?.area ?? "",
    city: initialData?.city ?? "",
    state: initialData?.state ?? "",
    country: initialData?.country ?? "UAE",
    postal_code: initialData?.postal_code ?? "",
    latitude: initialData?.latitude ?? null,
    longitude: initialData?.longitude ?? null,
    is_default: initialData?.is_default ?? false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField(key: keyof AddressInput, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field when user types
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  }

  function validateAndSubmit() {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.address_line.trim()) newErrors.address_line = "Address is required";
    if (!form.area.trim()) newErrors.area = "Area is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.country.trim()) newErrors.country = "Country is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(form);
  }

  const fields = [
    { key: "title", label: "Title", icon: "pricetag-outline", placeholder: "e.g., Home, Office" },
    { key: "address_line", label: "Address", icon: "home-outline", placeholder: "Street address" },
    { key: "area", label: "Area", icon: "map-outline", placeholder: "Area" },
    { key: "city", label: "City", icon: "business-outline", placeholder: "City" },
    { key: "state", label: "State", icon: "location-outline", placeholder: "State" },
    { key: "country", label: "Country", icon: "flag-outline", placeholder: "Country" },
    { key: "postal_code", label: "Postal Code", icon: "mail-outline", placeholder: "Postal Code" },
  ];

  return (
    <View style={styles.container}>
      {fields.map((item) => (
        <View key={item.key} style={styles.fieldContainer}>
          <View style={styles.labelContainer}>
            <Ionicons name={item.icon as any} size={16} color={Colors.light.textMuted} />
            <Text style={styles.label}>{item.label}</Text>
          </View>
          <TextInput
            style={[styles.input, errors[item.key] && styles.inputError]}
            placeholder={item.placeholder}
            placeholderTextColor={Colors.light.textLight}
            value={String(form[item.key as keyof AddressInput] || "")}
            onChangeText={(value) =>
              updateField(item.key as keyof AddressInput, value)
            }
          />
          {errors[item.key] && (
            <Text style={styles.errorText}>{errors[item.key]}</Text>
          )}
        </View>
      ))}

      {/* Default Address Checkbox */}
      <Pressable
        style={styles.checkbox}
        onPress={() => updateField("is_default", !form.is_default)}
      >
        <View style={[styles.box, form.is_default && styles.checked]}>
          {form.is_default && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
        </View>
        <Text style={styles.checkboxText}>Set as default address</Text>
      </Pressable>

      {/* Submit Button */}
      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={validateAndSubmit}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>{buttonText}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  fieldContainer: {
    gap: 4,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  label: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.light.text,
  },
  input: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.light.text,
    ...Shadow.sm,
  },
  inputError: {
    borderColor: Colors.light.danger,
  },
  errorText: {
    fontSize: Typography.size.sm,
    color: Colors.light.danger,
    marginTop: 2,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  box: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: Colors.light.border,
    borderRadius: Radius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  checkboxText: {
    fontSize: Typography.size.base,
    color: Colors.light.text,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: Spacing.md,
    ...Shadow.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
  },
});