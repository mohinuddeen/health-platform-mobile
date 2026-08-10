// health-platform-mobile/src/components/home/ServiceCard.tsx
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Service } from "@/src/types/service";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const router = useRouter();
  const image = service.images?.[0]?.image_url ?? null;

  const handlePress = () => {
    router.push(`/services/${service.id}`);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      {image ? (
        <Image source={image} style={styles.image} contentFit="cover" />
      ) : (
        <View style={[styles.image, styles.placeholderImage]}>
          <Ionicons name="medkit" size={32} color={Colors.light.primaryLight} />
        </View>
      )}

      {service.is_new && (
        <View style={[styles.badge, styles.newBadge]}>
          <Text style={styles.badgeText}>New</Text>
        </View>
      )}
      {service.is_trending && (
        <View style={[styles.badge, styles.trendingBadge]}>
          <Text style={styles.badgeText}>Trending</Text>
        </View>
      )}
      {service.is_featured && (
        <View style={[styles.badge, styles.featuredBadge]}>
          <Text style={styles.badgeText}>Featured</Text>
        </View>
      )}

      <Text style={styles.title} numberOfLines={1}>
        {service.title}
      </Text>

      <View style={styles.priceContainer}>
        {service.discount_price ? (
          <>
            <Text style={styles.discountPrice}>AED {service.discount_price}</Text>
            <Text style={styles.originalPrice}>AED {service.price}</Text>
          </>
        ) : (
          <Text style={styles.price}>AED {service.price}</Text>
        )}
      </View>

      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color="#F59E0B" />
        <Text style={styles.ratingText}>
          {service.rating?.toFixed(1) || "0"} ({service.review_count || 0})
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
    width: 170,
    ...Shadow.sm,
  },
  image: {
    width: "100%",
    height: 110,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },
  placeholderImage: {
    backgroundColor: Colors.light.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: Spacing.sm,
    left: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    zIndex: 1,
  },
  newBadge: {
    backgroundColor: Colors.light.accent,
  },
  trendingBadge: {
    backgroundColor: Colors.light.primary,
  },
  featuredBadge: {
    backgroundColor: "#8B5CF6",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
});