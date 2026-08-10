// health-platform-mobile/app/services/[id].tsx
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
import { usePublicService } from "@/src/hooks/useServices";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Header from "@/src/components/layout/Header";

export default function ServiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { data: service, isLoading, error } = usePublicService(id);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (error || !service) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load service.</Text>
      </View>
    );
  }

  const handleBookPress = () => {
    if (!isAuthenticated) {
      router.push("/(auth)/login");
      return;
    }
    router.push(`/bookings/${service.id}`);
  };

  const imageUrl = service.images?.[0]?.image_url || null;

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Image */}
        <View style={styles.imageContainer}>
          {imageUrl && !imageError ? (
            <Image source={{ uri: imageUrl }} style={styles.image} onError={() => setImageError(true)} />
          ) : (
            <View style={[styles.image, styles.placeholderImage]}>
              <Ionicons name="medkit" size={48} color={Colors.light.primaryLight} />
            </View>
          )}
          
          {/* Badges */}
          <View style={styles.badgeContainer}>
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
          </View>

          {/* Wishlist Button */}
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
        <Text style={styles.title}>{service.title}</Text>

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

        {/* Rating & Meta */}
        <View style={styles.metaRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>
              {service.rating?.toFixed(1) || "0"} ({service.review_count || 0} reviews)
            </Text>
          </View>
          {service.duration && (
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={Colors.light.textMuted} />
              <Text style={styles.metaText}>{service.duration}</Text>
            </View>
          )}
        </View>

        {service.categories && (
          <View style={styles.categoryContainer}>
            <Ionicons name="pricetag-outline" size={16} color={Colors.light.textMuted} />
            <Text style={styles.categoryText}>{service.categories.name}</Text>
          </View>
        )}

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{service.description || service.short_description}</Text>

        {service.preparation && (
          <>
            <Text style={styles.sectionTitle}>Preparation</Text>
            <Text style={styles.description}>{service.preparation}</Text>
          </>
        )}

        {service.includes && (
          <>
            <Text style={styles.sectionTitle}>What's Included</Text>
            <Text style={styles.description}>{service.includes}</Text>
          </>
        )}

        {/* Features */}
        <View style={styles.featuresGrid}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="time-outline" size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.featureTitle}>Flexible Timing</Text>
            <Text style={styles.featureDesc}>Choose your slot</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="location-outline" size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.featureTitle}>At Your Location</Text>
            <Text style={styles.featureDesc}>Service comes to you</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="people-outline" size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.featureTitle}>Professional Care</Text>
            <Text style={styles.featureDesc}>Certified providers</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Ionicons name="calendar-outline" size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.featureTitle}>Easy Booking</Text>
            <Text style={styles.featureDesc}>Simple & quick</Text>
          </View>
        </View>

        {/* Book Button */}
        <Pressable style={styles.bookButton} onPress={handleBookPress}>
          <Text style={styles.bookButtonText}>
            {isAuthenticated ? "Book Now" : "Login to Book"}
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
    height: 240,
    borderRadius: Radius.lg,
  },
  placeholderImage: {
    backgroundColor: Colors.light.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeContainer: {
    position: "absolute",
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: "row",
    gap: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
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
  wishlistButton: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.md,
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
    marginBottom: Spacing.md,
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
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  ratingText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  categoryText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
  sectionTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.size.base,
    lineHeight: Typography.lineHeight.relaxed * Typography.size.base,
    color: Colors.light.textSecondary,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  featureItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: Colors.light.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    ...Shadow.sm,
  },
  featureIcon: {
    backgroundColor: Colors.light.mintBg,
    padding: Spacing.sm,
    borderRadius: Radius.full,
    marginBottom: Spacing.xs,
  },
  featureTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    textAlign: "center",
  },
  featureDesc: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
    textAlign: "center",
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