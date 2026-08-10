// health-platform-mobile/src/components/ui/Button.tsx
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors, Spacing, Radius, Typography } from "@/constants/theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const colors = Colors.light;

  const getButtonStyle = (): ViewStyle => {
    let baseStyle: ViewStyle = {
      borderRadius: Radius.md,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: Spacing.sm,
    };

    if (fullWidth) {
      baseStyle.width = "100%";
    }

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
          ...(disabled && { opacity: 0.5 }),
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: colors.surfaceAlt,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors.border,
        };
      case "danger":
        return {
          ...baseStyle,
          backgroundColor: colors.danger,
          ...(disabled && { opacity: 0.5 }),
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "sm":
        return { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm };
      case "lg":
        return { paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.lg };
      case "md":
      default:
        return { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return "#FFFFFF";
      case "danger":
        return "#FFFFFF";
      case "outline":
        return colors.text;
      case "ghost":
        return colors.primary;
      case "secondary":
      default:
        return colors.text;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return Typography.size.sm;
      case "lg":
        return Typography.size.lg;
      case "md":
      default:
        return Typography.size.base;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), getSizeStyle(), style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text
          style={[
            {
              color: getTextColor(),
              fontSize: getTextSize(),
              fontWeight: Typography.weight.semibold,
              textAlign: "center",
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}