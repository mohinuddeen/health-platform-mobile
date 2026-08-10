// health-platform-mobile/src/components/ui/Card.tsx
import { View, StyleSheet, ViewStyle, useColorScheme } from "react-native";
import { Colors, Radius, Shadow, Spacing } from "@/constants/theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "elevated" | "outlined";
  noPadding?: boolean;
}

export default function Card({
  children,
  style,
  variant = "default",
  noPadding = false,
}: CardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "elevated":
        return {
          ...Shadow.md,
          backgroundColor: colors.surface,
        };
      case "outlined":
        return {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case "default":
      default:
        return {
          backgroundColor: colors.surface,
          ...Shadow.sm,
        };
    }
  };

  const styles = StyleSheet.create({
    card: {
      borderRadius: Radius.lg,
      padding: noPadding ? 0 : Spacing.lg,
      ...getVariantStyle(),
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
}