import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AnimatedSection from "@/src/components/ui/AnimatedSection";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";

const colors = Colors.light;

const stats = [
  { icon: "people" as const, value: 5000, suffix: "+", label: "Patients Served" },
  { icon: "medkit" as const, value: 120, suffix: "+", label: "Certified Nurses" },
  { icon: "star" as const, value: 4.9, suffix: "/5", label: "Avg. Rating", decimals: 1 },
  { icon: "time" as const, value: 24, suffix: "/7", label: "Support" },
];

function useCountUp(target: number, decimals = 0, duration = 1200) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const step = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      setValue(target * progress);
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value.toFixed(decimals);
}

function StatItem({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const display = useCountUp(stat.value, stat.decimals ?? 0);
  return (
    <AnimatedSection index={index} style={styles.statItem}>
      <View style={styles.iconCircle}>
        <Ionicons name={stat.icon} size={18} color={colors.primary} />
      </View>
      <Text style={styles.statValue}>
        {display}
        {stat.suffix}
      </Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </AnimatedSection>
  );
}

export default function TrustStats() {
  return (
    <View style={styles.container}>
      {stats.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: colors.surfaceAlt,
    borderRadius: Radius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.sm,
    justifyContent: "space-between",
  },
  statItem: {
    width: "25%",
    alignItems: "center",
    paddingHorizontal: Spacing.xs,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extrabold,
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 2,
  },
});