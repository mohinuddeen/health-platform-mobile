// health-platform-mobile/src/components/home/PackageCard.tsx
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Package } from "@/src/types/home";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  pkg: Package;
}

export default function PackageCard({ pkg }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/packages/${pkg.id}`);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      {pkg.image_url ? (
        <Image source={pkg.image_url} style={styles.image} contentFit="cover" />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Ionicons name="cube" size={32} color={Colors.light.primaryLight} />
        </View>
      )}

      {pkg.discount_price && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(((pkg.price - pkg.discount_price) / pkg.price) * 100)}% OFF
          </Text>
        </View>
      )}

      <Text style={styles.title} numberOfLines={1}>
        {pkg.title}
      </Text>

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

      <View style={styles.servicesContainer}>
        <Ionicons name="medkit-outline" size={14} color={Colors.light.textMuted} />
        <Text style={styles.servicesText}>
          {pkg.package_services?.length || 0} services
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginRight: Spacing.md,
    width: 200,
    ...Shadow.sm,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },
  placeholderImage: {
    backgroundColor: Colors.light.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  discountBadge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.light.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    zIndex: 1,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  title: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  price: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.light.primary,
  },
  discountPrice: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.light.primary,
  },
  originalPrice: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    textDecorationLine: "line-through",
  },
  servicesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  servicesText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
});