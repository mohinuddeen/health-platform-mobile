import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";

const colors = Colors.light;

const messages = [
  { at: 0, text: "Loading CareNest..." },
  { at: 4, text: "Almost there — waking things up..." },
  { at: 9, text: "This demo runs on a free-tier server that sleeps when idle." },
  { at: 14, text: "It's spinning back up now — usually done within 30–50 seconds." },
  { at: 25, text: "Thanks for your patience! Almost ready..." },
];

export default function LoadingScreen() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage =
    [...messages].reverse().find((m) => seconds >= m.at)?.text ?? messages[0].text;
  const showColdStartNote = seconds >= 9;

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="pulse" size={30} color={colors.primary} />
      </View>

      <Text style={styles.message}>{currentMessage}</Text>
      <Text style={styles.timer}>{seconds}s elapsed</Text>

      {showColdStartNote && (
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            👋 This is a portfolio project hosted on a free-tier server, which
            sleeps after inactivity. It only takes this long on the very first
            load — once it's awake, everything else loads instantly.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: Spacing.xxl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  message: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: colors.text,
    textAlign: "center",
  },
  timer: {
    fontSize: Typography.size.xs,
    color: colors.textLight,
    marginTop: Spacing.xs,
  },
  noteBox: {
    marginTop: Spacing.xl,
    backgroundColor: colors.surfaceAlt,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textMuted,
    textAlign: "center",
  },
});