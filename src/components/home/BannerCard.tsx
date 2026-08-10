// health-platform-mobile/src/components/home/BannerCard.tsx
import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Banner } from "@/src/types/home";
import { Colors, Spacing, Typography, Radius } from "@/constants/theme";

interface Props {
  banner: Banner;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function BannerCard({ banner }: Props) {
  return (
    <View style={styles.container}>
      <Image source={banner.image_url} style={styles.image} contentFit="cover" />
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
    height: 180,
    borderRadius: Radius.lg,
    overflow: "hidden",
    marginRight: Spacing.md,
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
    padding: Spacing.lg,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: "#FFFFFF",
  },
  subtitle: {
    marginTop: Spacing.xs,
    fontSize: Typography.size.base,
    color: "rgba(255,255,255,0.9)",
  },
});