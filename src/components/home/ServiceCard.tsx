// health-platform-mobile/src/components/home/ServiceCard.tsx
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Service } from "@/src/types/service";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { hexToRgba } from "@/src/utils/color";
import PressableScale from "@/src/components/ui/PressableScale";

interface Props {
  service: Service;
}

const colors = Colors.light;

// Priority order when a service qualifies for more than one badge —
// show only the single most relevant one to keep the card calm.
function getBadge(service: Service) {
  if (service.is_new) return { label: "New", color: colors.accent, icon: "sparkles" as const };
  if (service.is_trending) return { label: "Trending", color: colors.cta, icon: "flame" as const };
  if (service.is_featured) return { label: "Featured", color: colors.primary, icon: "star" as const };
  return null;
}

export default function ServiceCard({ service }: Props) {
  const router = useRouter();
  const image = service.images?.[0]?.image_url ?? null;
  const badge = getBadge(service);

  const handlePress = () => {
    router.push(`/services/${service.id}`);
  };

  return (
    <PressableScale style={styles.card} onPress={handlePress}>
      <View style={styles.imageWrap}>
        {image ? (
          <Image source={image} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Ionicons name="medkit" size={30} color={colors.primary} />
          </View>
        )}

        {badge && (
          <View style={[styles.badge, { backgroundColor: badge.color }]}>
            <Ionicons name={badge.icon} size={11} color="#FFFFFF" />
            <Text style={styles.badgeText}>{badge.label}</Text>
          </View>
        )}

        <View style={styles.ratingChip}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={styles.ratingChipText}>{service.rating?.toFixed(1) || "0"}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {service.title}
        </Text>

        <View style={styles.footerRow}>
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
          <Text style={styles.reviewCount}>({service.review_count || 0})</Text>
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
    width: 172,
    overflow: "hidden",
    ...Shadow.md,
    shadowColor: colors.primary,
  },
  imageWrap: {
    width: "100%",
    height: 112,
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
  badge: {
    position: "absolute",
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
  ratingChip: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: hexToRgba("#FFFFFF", 0.92),
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  ratingChipText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: colors.text,
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
    justifyContent: "space-between",
    alignItems: "flex-end",
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
  reviewCount: {
    fontSize: Typography.size.xs,
    color: colors.textMuted,
  },
});