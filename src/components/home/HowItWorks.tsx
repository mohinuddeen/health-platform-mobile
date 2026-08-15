import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedSection from "@/src/components/ui/AnimatedSection";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";

const colors = Colors.light;

const steps = [
  { icon: "calendar" as const, title: "Book a Service", description: "Pick a service and a time slot that works for you." },
  { icon: "person-add" as const, title: "Nurse Assigned", description: "We match you with a certified nurse nearby, with live tracking." },
  { icon: "walk" as const, title: "We Visit Your Home", description: "Your caregiver arrives on time, fully equipped and sanitized." },
  { icon: "checkmark-done" as const, title: "Care Completed", description: "Get a digital care summary and rate the visit instantly." },
];

export default function HowItWorks() {
  return (
    <View>
      <Text style={styles.heading}>The Process</Text>
      <Text style={styles.subheading}>How a Home Visit Works</Text>

      <View style={styles.timeline}>
        {steps.map((step, i) => (
          <AnimatedSection key={step.title} index={i} style={styles.row}>
            <View style={styles.leftCol}>
              <View style={styles.iconCircle}>
                <Ionicons name={step.icon} size={18} color="#FFFFFF" />
              </View>
              {i < steps.length - 1 && <View style={styles.connector} />}
            </View>
            <View style={styles.textCol}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
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
  timeline: {},
  row: {
    flexDirection: "row",
  },
  leftCol: {
    alignItems: "center",
    width: 44,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  textCol: {
    flex: 1,
    paddingBottom: Spacing.lg,
    paddingLeft: Spacing.sm,
  },
  stepTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: colors.text,
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 17,
  },
});