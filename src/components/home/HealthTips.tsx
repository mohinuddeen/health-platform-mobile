import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedSection from "@/src/components/ui/AnimatedSection";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";

const colors = Colors.light;

const tips = [
  { icon: "water" as const, title: "Stay Hydrated", tip: "Aim for 6–8 glasses of water daily for circulation and skin health." },
  { icon: "moon" as const, title: "Prioritize Sleep", tip: "7–9 hours of quality sleep supports immune function and focus." },
  { icon: "nutrition" as const, title: "Eat the Rainbow", tip: "Colorful fruits & veggies give a wider range of vitamins." },
  { icon: "walk" as const, title: "Move Daily", tip: "Even a 20–30 min walk can lower blood pressure and boost mood." },
];

export default function HealthTips() {
  return (
    <View>
      <Text style={styles.heading}>Wellness Corner</Text>
      <Text style={styles.subheading}>Simple Health Tips</Text>

      {tips.map((tip, i) => (
        <AnimatedSection key={tip.title} index={i} style={styles.card}>
          <View style={styles.iconWrap}>
            <Ionicons name={tip.icon} size={18} color={colors.primary} />
          </View>
          <View style={styles.textCol}>
            <Text style={styles.cardTitle}>{tip.title}</Text>
            <Text style={styles.cardTip}>{tip.tip}</Text>
          </View>
        </AnimatedSection>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: Typography.size["2xl"],
    fontWeight: Typography.weight.bold,
    color: colors.text,
    marginTop: 4,
    marginBottom: Spacing.lg,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.mintBg,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  textCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  cardTip: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
  },
});