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
import TrustStats from "@/src/components/home/TrustStats";
import WhyChooseUs from "@/src/components/home/WhyChooseUs";
import HowItWorks from "@/src/components/home/HowItWorks";
import HealthTips from "@/src/components/home/HealthTips";
import Testimonials from "@/src/components/home/Testimonials";
import CTASection from "@/src/components/home/CTASection";
import LoadingScreen from "@/src/components/ui/LoadingScreen";

const SCREEN_WIDTH = Dimensions.get("window").width;
const colors = Colors.light;

function SectionHeader({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  const content = (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.seeAllRow}>
        <Text style={styles.seeAll}>See all</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </View>
    </View>
  );

  if (!href) {
    return <TouchableOpacity activeOpacity={0.7}>{content}</TouchableOpacity>;
  }

  return (
    <Link href={href} asChild>
      <TouchableOpacity activeOpacity={0.7}>{content}</TouchableOpacity>
    </Link>
  );
}

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
  return <LoadingScreen />;
}

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={40} color={colors.textLight} />
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

         <View style={{ marginTop: Spacing.lg }}>
          <TrustStats />
        </View>

        {/* Categories */}
        <SectionHeader title="Categories" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railContent}
        >
          {data?.categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </ScrollView>

        {/* Why Choose Us */}
        <View style={{ marginTop: Spacing.xxl }}>
          <WhyChooseUs />
        </View>


        {/* Featured Services */}
        <SectionHeader title="Featured Services" href="/services" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railContent}
        >
          {data?.featured_services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ScrollView>
 {/* How It Works */}
        <View style={{ marginTop: Spacing.xxl }}>
          <HowItWorks />
        </View>
        {/* Trending Services */}
        <SectionHeader title="Trending Services" href="/services" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railContent}
        >
          {data?.trending_services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ScrollView>

        {/* New Services */}
        <SectionHeader title="New Services" href="/services" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railContent}
        >
          {data?.new_services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </ScrollView>

        {/* Packages */}
        <SectionHeader title="Packages" href="/packages" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.railContent}
        >
          {data?.packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </ScrollView>

        {/* Health Tips */}
        <View style={{ marginTop: Spacing.xxl }}>
          <HealthTips />
        </View>

        {/* Testimonials */}
        <View style={{ marginTop: Spacing.xxl }}>
          <Testimonials />
        </View>

        {/* Final CTA */}
        <View style={{ marginTop: Spacing.xxl }}>
          <CTASection />
        </View>
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
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxxl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.xxl,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.size["2xl"],
    fontWeight: Typography.weight.bold,
    color: colors.text,
    letterSpacing: -0.2,
  },
  seeAllRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAll: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.semibold,
    color: colors.primary,
  },
  railContent: {
    paddingRight: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
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
    gap: Spacing.md,
  },
  errorText: {
    color: colors.textMuted,
    fontSize: Typography.size.base,
  },
});