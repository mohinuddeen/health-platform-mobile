import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";

const colors = Colors.light;

const testimonials = [
  { name: "Fatima Al Suwaidi", role: "Elderly Care", quote: "The nurse arrived on time and treated my mother with so much patience.", rating: 5 },
  { name: "Rahul Menon", role: "Post-Surgery Care", quote: "Booking was simple and every visit was handled professionally.", rating: 5 },
  { name: "Aisha Khan", role: "Physiotherapy", quote: "Transparent pricing and I could track my therapist arriving live.", rating: 4 },
];

export default function Testimonials() {
  return (
    <View>
      <Text style={styles.heading}>Testimonials</Text>
      <Text style={styles.subheading}>What Our Patients Say</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.railContent}
      >
        {testimonials.map((t) => (
          <View key={t.name} style={styles.card}>
            <Ionicons name="chatbox-ellipses" size={18} color={colors.primaryLight} />
            <Text style={styles.quote} numberOfLines={4}>
              "{t.quote}"
            </Text>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < t.rating ? "star" : "star-outline"}
                  size={13}
                  color="#F59E0B"
                />
              ))}
            </View>
            <Text style={styles.name}>{t.name}</Text>
            <Text style={styles.role}>{t.role}</Text>
          </View>
        ))}
      </ScrollView>
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
  railContent: {
    paddingRight: Spacing.md,
  },
  card: {
    width: 220,
    backgroundColor: colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    marginRight: Spacing.md,
    ...Shadow.sm,
  },
  quote: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: colors.text,
  },
  role: {
    fontSize: 11,
    color: colors.textLight,
  },
});