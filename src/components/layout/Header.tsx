// health-platform-mobile/src/components/layout/Header.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";

export default function Header() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: colors.primary,
    },
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 60,
      paddingHorizontal: Spacing.lg,
      backgroundColor: colors.primary,
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
    },
    logoContainer: {
      width: 36,
      height: 36,
      borderRadius: Radius.md,
      backgroundColor: "rgba(255,255,255,0.15)",
      justifyContent: "center",
      alignItems: "center",
    },
    logoText: {
      fontSize: Typography.size.lg,
      fontWeight: Typography.weight.bold,
      color: "#FFFFFF",
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    title: {
      fontSize: Typography.size['2xl'],
      fontWeight: Typography.weight.bold,
      color: "#FFFFFF",
      letterSpacing: -0.3,
    },
    titleAccent: {
      color: "#CCFBF1",
    },
    subtitle: {
      fontSize: Typography.size.xs,
      color: "rgba(255,255,255,0.7)",
      marginLeft: Spacing.sm,
      fontWeight: Typography.weight.medium,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: Radius.full,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.15)",
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>CN</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Care</Text>
            <Text style={[styles.title, styles.titleAccent]}>Nest</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}