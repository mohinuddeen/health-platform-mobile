// health-platform-mobile/app/packages/[id].tsx
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import Header from "@/src/components/layout/Header";
import { usePackage } from "@/src/hooks/usePackages";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function PackageDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { data, isLoading, error } = usePackage(id);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load package details.</Text>
      </View>
    );
  }

  const handleBookPackage = () => {
    if (!isAuthenticated) {
      router.push("/(auth)/login");
      return;
    }
    router.push({
      pathname: `/bookings/${id}`,
      params: { type: "package" },
    });
  };

  const serviceCount = data.package_services?.length || 0;
  const hasDiscount = data.discount_price && data.discount_price < data.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((data.price - data.discount_price) / data.price) * 100) 
    : 0;

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Image */}
        <View style={styles.imageContainer}>
          {data.image_url && !imageError ? (
            <Image source={{ uri: data.image_url }} style={styles.image} onError={() => setImageError(true)} />
          ) : (
            <View style={[styles.image, styles.placeholderImage]}>
              <Ionicons name="cube" size={48} color={Colors.light.primaryLight} />
            </View>
          )}
          
          {hasDiscount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>{discountPercentage}% OFF</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => setIsWishlisted(!isWishlisted)}
          >
            <Ionicons 
              name={isWishlisted ? "heart" : "heart-outline"} 
              size={24} 
              color={isWishlisted ? Colors.light.danger : Colors.light.textMuted} 
            />
          </TouchableOpacity>
        </View>

        {/* Title & Price */}
        <Text style={styles.title}>{data.title}</Text>

        <View style={styles.priceContainer}>
          {hasDiscount ? (
            <>
              <Text style={styles.discountPrice}>AED {data.discount_price}</Text>
              <Text style={styles.originalPrice}>AED {data.price}</Text>
            </>
          ) : (
            <Text style={styles.price}>AED {data.price}</Text>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="cube-outline" size={20} color={Colors.light.primary} />
            <Text style={styles.statValue}>{serviceCount}</Text>
            <Text style={styles.statLabel}>Services</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color={Colors.light.primary} />
            <Text style={styles.statValue}>Available</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color={Colors.light.primary} />
            <Text style={styles.statValue}>Flexible</Text>
            <Text style={styles.statLabel}>Timing</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{data.description}</Text>

        {/* Included Services */}
        <Text style={styles.sectionTitle}>Included Services ({serviceCount})</Text>
        {data.package_services?.map((item) => (
          <View key={item.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceIcon}>
                <Ionicons name="checkmark" size={16} color={Colors.light.primary} />
              </View>
              <Text style={styles.serviceTitle}>{item.services.title}</Text>
            </View>
            {item.services.short_description && (
              <Text style={styles.serviceDescription} numberOfLines={2}>
                {item.services.short_description}
              </Text>
            )}
            {item.services.duration && (
              <View style={styles.serviceMeta}>
                <Ionicons name="time-outline" size={14} color={Colors.light.textMuted} />
                <Text style={styles.serviceMetaText}>{item.services.duration}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Book Button */}
        <Pressable style={styles.bookButton} onPress={handleBookPackage}>
          <Text style={styles.bookButtonText}>
            {isAuthenticated ? "Book Package" : "Login to Book"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  errorText: {
    color: Colors.light.danger,
    fontSize: Typography.size.base,
  },
  imageContainer: {
    position: "relative",
    marginBottom: Spacing.lg,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: Radius.lg,
  },
  placeholderImage: {
    backgroundColor: Colors.light.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  discountBadge: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.light.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  discountBadgeText: {
    color: "#FFFFFF",
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
  },
  wishlistButton: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: Radius.full,
    padding: Spacing.sm,
    ...Shadow.sm,
  },
  title: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  price: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.primary,
  },
  discountPrice: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.primary,
  },
  originalPrice: {
    fontSize: Typography.size.lg,
    color: Colors.light.textMuted,
    textDecorationLine: "line-through",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    ...Shadow.sm,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
  },
  sectionTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: Typography.size.base,
    lineHeight: Typography.lineHeight.relaxed * Typography.size.base,
    color: Colors.light.textSecondary,
  },
  serviceCard: {
    backgroundColor: Colors.light.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  serviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  serviceIcon: {
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: Colors.light.mintBg,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    flex: 1,
  },
  serviceDescription: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xxxl,
  },
  serviceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xxxl,
  },
  serviceMetaText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
  bookButton: {
    marginTop: Spacing.xxxl,
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: "center",
    ...Shadow.md,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
  },
});