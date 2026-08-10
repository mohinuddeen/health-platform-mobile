// health-platform-mobile/app/(tabs)/index.tsx
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useHomeData } from "@/src/hooks/useHome";
import Header from "@/src/components/layout/Header";
import BannerCard from "@/src/components/home/BannerCard";
import CategoryCard from "@/src/components/home/CategoryCard";
import ServiceCard from "@/src/components/home/ServiceCard";
import PackageCard from "@/src/components/home/PackageCard";
import { Link } from "expo-router";
import { Colors, Spacing, Typography, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const colors = Colors.light;

export default function HomeScreen() {
  const { data, isLoading, error } = useHomeData();
  const bannerRef = useRef<ScrollView>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (!data?.banners.length) return;
    const timer = setInterval(() => {
      const nextIndex = bannerIndex + 1 >= data.banners.length ? 0 : bannerIndex + 1;
      bannerRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setBannerIndex(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [bannerIndex, data?.banners.length]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load home data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      
      <View style={styles.content}>
        {/* Banner Carousel */}
        <ScrollView
          ref={bannerRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setBannerIndex(index);
          }}
        >
          {data?.banners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))}
        </ScrollView>

        <View style={styles.dotsContainer}>
          {data?.banners.map((banner, index) => (
            <View
              key={banner.id}
              style={[styles.dot, bannerIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ScrollView>

        {/* Featured Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <Link href="/services">
            <Text style={styles.seeAll}>See All</Text>
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.featured_services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ScrollView>

        {/* Trending Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Services</Text>
          <Link href="/services">
            <Text style={styles.seeAll}>See All</Text>
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.trending_services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ScrollView>

        {/* New Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Services</Text>
          <Link href="/services">
            <Text style={styles.seeAll}>See All</Text>
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.new_services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ScrollView>

        {/* Packages */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Packages</Text>
          <Link href="/packages">
            <Text style={styles.seeAll}>See All</Text>
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: colors.text,
  },
  seeAll: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: colors.primary,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: Spacing.xs,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.danger,
    fontSize: Typography.size.base,
  },
});