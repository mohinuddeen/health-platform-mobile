import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedSection from "@/src/components/ui/AnimatedSection";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";

const colors = Colors.light;

const reasons = [
  {
    icon: "ribbon" as const,
    title: "Verified & Certified Nurses",
    description: "Every caregiver is background-checked and licensed before visiting your home.",
  },
  {
    icon: "home" as const,
    title: "Care in Your Own Home",
    description: "Skip the clinic. Our staff bring equipment and expertise to your doorstep.",
  },
  {
    icon: "shield-checkmark" as const,
    title: "Safety & Hygiene First",
    description: "Strict infection-control protocols and full PPE on every single visit.",
  },
  {
    icon: "wallet" as const,
    title: "Transparent Pricing",
    description: "No hidden fees — see the exact price before you book, every time.",
  },
];

export default function WhyChooseUs() {
  return (
    <View>
      <Text style={styles.heading}>Why CareNest</Text>
      <Text style={styles.subheading}>
        Healthcare you can trust, delivered to your door
      </Text>

      <View style={styles.grid}>
        {reasons.map((reason, i) => (
          <AnimatedSection key={reason.title} index={i} style={styles.card}>
            <View style={styles.iconWrap}>
              <Ionicons name={reason.icon} size={20} color={colors.primary} />
            </View>
            <Text style={styles.cardTitle}>{reason.title}</Text>
            <Text style={styles.cardDescription}>{reason.description}</Text>
          </AnimatedSection>
        ))}
      </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: colors.text,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
  },
});