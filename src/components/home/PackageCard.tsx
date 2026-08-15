// health-platform-mobile/src/components/home/PackageCard.tsx
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Package } from "@/src/types/home";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import PressableScale from "@/src/components/ui/PressableScale";

interface Props {
  pkg: Package;
}

const colors = Colors.light;

export default function PackageCard({ pkg }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/packages/${pkg.id}`);
  };

  return (
    <PressableScale style={styles.card} onPress={handlePress}>
      <View style={styles.imageWrap}>
        {pkg.image_url ? (
          <Image source={pkg.image_url} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Ionicons name="cube" size={30} color={colors.primary} />
          </View>
        )}

        {pkg.discount_price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {Math.round(((pkg.price - pkg.discount_price) / pkg.price) * 100)}% OFF
            </Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {pkg.title}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            {pkg.discount_price ? (
              <>
                <Text style={styles.discountPrice}>AED {pkg.discount_price}</Text>
                <Text style={styles.originalPrice}>AED {pkg.price}</Text>
              </>
            ) : (
              <Text style={styles.price}>AED {pkg.price}</Text>
            )}
          </View>
        </View>

        <View style={styles.servicesContainer}>
          <Ionicons name="medkit-outline" size={13} color={colors.textMuted} />
          <Text style={styles.servicesText}>
            {pkg.package_services?.length || 0} services included
          </Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: Radius.xl,
    marginRight: Spacing.md,
    width: 208,
    overflow: "hidden",
    ...Shadow.md,
    shadowColor: colors.primary,
  },
  imageWrap: {
    width: "100%",
    height: 122,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  discountBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: colors.cta,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  body: {
    padding: Spacing.md,
  },
  title: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: colors.text,
    marginBottom: Spacing.sm,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.sm,
  },
  price: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extrabold,
    color: colors.primary,
  },
  discountPrice: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extrabold,
    color: colors.primary,
  },
  originalPrice: {
    fontSize: Typography.size.xs,
    color: colors.textLight,
    textDecorationLine: "line-through",
  },
  servicesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
  servicesText: {
    fontSize: Typography.size.xs,
    color: colors.textMuted,
  },
});