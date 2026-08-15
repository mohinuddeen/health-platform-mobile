// health-platform-mobile/src/components/home/BannerCard.tsx
import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Banner } from "@/src/types/home";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { hexToRgba } from "@/src/utils/color";

interface Props {
  banner: Banner;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const colors = Colors.light;

export default function BannerCard({ banner }: Props) {
  return (
    <View style={styles.container}>
      <Image source={banner.image_url} style={styles.image} contentFit="cover" />

      {/* Brand-tinted scrim instead of flat black overlay */}
      <LinearGradient
        colors={[
          "transparent",
          hexToRgba(colors.text, 0.15),
          hexToRgba(colors.primary, 0.72),
        ]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>{banner.title}</Text>
        {banner.subtitle && <Text style={styles.subtitle}>{banner.subtitle}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 20,
    height: 190,
    borderRadius: Radius.xxl,
    overflow: "hidden",
    marginRight: Spacing.md,
    backgroundColor: colors.surfaceAlt,
    ...Shadow.lg,
    shadowColor: colors.primary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.xl,
  },
  title: {
    fontSize: Typography.size["3xl"],
    fontWeight: Typography.weight.extrabold,
    color: "#FFFFFF",
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: Spacing.xs,
    fontSize: Typography.size.base,
    color: "rgba(255,255,255,0.92)",
    fontWeight: Typography.weight.medium,
  },
});