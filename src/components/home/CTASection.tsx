import { StyleSheet, Text, View, Linking } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";
import PressableScale from "@/src/components/ui/PressableScale";

const colors = Colors.light;

export default function CTASection() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Ready for Care at Your Doorstep?</Text>
      <Text style={styles.subtitle}>
        Book a certified nurse today and experience healthcare that comes to you.
      </Text>

      <View style={styles.buttonRow}>
        <PressableScale style={styles.primaryBtn} onPress={() => router.push("/services")}>
          <Text style={styles.primaryBtnText}>Book a Service</Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </PressableScale>

        <PressableScale
          style={styles.outlineBtn}
          onPress={() => Linking.openURL("tel:+971568319493")}
        >
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <Text style={styles.outlineBtnText}>Call Us</Text>
        </PressableScale>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.xxl,
    padding: Spacing.xl,
    alignItems: "center",
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  buttonRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  primaryBtnText: {
    color: colors.primary,
    fontWeight: Typography.weight.semibold,
    fontSize: Typography.size.sm,
  },
  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  outlineBtnText: {
    color: "#FFFFFF",
    fontWeight: Typography.weight.semibold,
    fontSize: Typography.size.sm,
  },
});