// health-platform-mobile/app/(tabs)/services.tsx
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import Header from "@/src/components/layout/Header";
import { usePublicServices } from "@/src/hooks/useServices";
import { useCategories } from "@/src/hooks/useCategories";
import { router } from "expo-router";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const colors = Colors.light;

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data, isLoading, error } = usePublicServices({
    page: 1,
    limit: 20,
    category_id: selectedCategory,
  });
  const { data: categories, isLoading: categoriesLoading } = useCategories();

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
        <Text style={styles.errorText}>Failed to load services.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header />

      <FlatList
        data={data?.results ?? []}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>Services</Text>

            {!categoriesLoading && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryContainer}
              >
                <Pressable
                  style={[
                    styles.category,
                    !selectedCategory && styles.activeCategory,
                  ]}
                  onPress={() => setSelectedCategory(undefined)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      !selectedCategory && styles.activeText,
                    ]}
                  >
                    All
                  </Text>
                </Pressable>

                {categories?.map((category) => (
                  <Pressable
                    key={category.id}
                    style={[
                      styles.category,
                      selectedCategory === category.id && styles.activeCategory,
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category.id && styles.activeText,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/services/[id]",
                params: { id: item.id },
              })
            }
          >
            {item.images?.[0]?.image_url ? (
              <Image
                source={{ uri: item.images[0].image_url }}
                style={styles.cardImage}
              />
            ) : (
              <View style={[styles.cardImage, styles.placeholderImage]}>
                <Ionicons name="medkit" size={32} color={colors.primaryLight} />
              </View>
            )}

            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>

            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.short_description}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.cardPrice}>
                AED {item.discount_price ?? item.price}
              </Text>
              {item.discount_price && (
                <Text style={styles.cardOldPrice}>AED {item.price}</Text>
              )}
            </View>

            <View style={styles.cardRating}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.cardRatingText}>
                {item.rating?.toFixed(1) || "0"} ({item.review_count || 0})
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  row: {
    justifyContent: "space-between",
  },
  header: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold,
    marginBottom: Spacing.md,
    color: colors.text,
  },
  categoryContainer: {
    marginBottom: Spacing.lg,
  },
  category: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: Radius.full,
    marginRight: Spacing.sm,
    ...Shadow.sm,
  },
  activeCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.text,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
  },
  activeText: {
    color: "#FFFFFF",
  },
  card: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },
  placeholderImage: {
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: colors.text,
    marginBottom: Spacing.xs,
  },
  cardDescription: {
    fontSize: Typography.size.sm,
    color: colors.textMuted,
    marginBottom: Spacing.sm,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  cardPrice: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: colors.primary,
  },
  cardOldPrice: {
    fontSize: Typography.size.sm,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  cardRatingText: {
    fontSize: Typography.size.sm,
    color: colors.textMuted,
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