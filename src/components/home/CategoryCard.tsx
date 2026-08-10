// health-platform-mobile/src/components/home/CategoryCard.tsx
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { HomeCategory } from "@/src/types/home";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";

interface Props {
  category: HomeCategory;
}

export default function CategoryCard({ category }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/services?category_id=${category.id}`);
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      {category.image_url ? (
        <Image source={category.image_url} style={styles.image} contentFit="cover" />
      ) : (
        <View style={[styles.image, styles.placeholderImage]} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {category.name}
      </Text>
      {category.description && (
        <Text style={styles.description} numberOfLines={2}>
          {category.description}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginRight: Spacing.md,
    width: 140,
    ...Shadow.sm,
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },
  placeholderImage: {
    backgroundColor: Colors.light.primaryLight,
  },
  title: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
});