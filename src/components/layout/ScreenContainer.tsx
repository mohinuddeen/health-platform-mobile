import { ReactNode } from "react";
import { ScrollView, StyleSheet, useColorScheme, ViewStyle, View } from "react-native";
import { Colors, Spacing } from "@/constants/theme";

interface Props {
  children: ReactNode;
  contentStyle?: ViewStyle;
  scrollable?: boolean;
}

export default function ScreenContainer({
  children,
  contentStyle,
  scrollable = true,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.xxl,
      gap: Spacing.lg,
    },
  });

  if (!scrollable) {
    return (
      <View style={[styles.container, styles.content, contentStyle]}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}