// health-platform-mobile/app/search.tsx
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { useSearch } from "@/src/hooks/useSearch";
import { SearchResponse } from "@/src/services/search.service";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useSearch(searchTerm);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchTerm(text);
    }, 300),
    []
  );

  const handleSearch = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchTerm("");
  };

  const renderServiceItem = (item: SearchResponse["services"][0]) => (
    <Pressable
      key={item.id}
      style={styles.resultItem}
      onPress={() => router.push(`/services/${item.id}`)}
    >
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        {item.categories && (
          <Text style={styles.resultCategory}>{item.categories.name}</Text>
        )}
        <Text style={styles.resultPrice}>
          AED {item.discount_price ?? item.price}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </Pressable>
  );

  const renderPackageItem = (item: SearchResponse["packages"][0]) => (
    <Pressable
      key={item.id}
      style={styles.resultItem}
      onPress={() => router.push(`/packages/${item.id}`)}
    >
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultPrice}>
          AED {item.discount_price ?? item.price}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </Pressable>
  );

  const renderCategoryItem = (item: SearchResponse["categories"][0]) => (
    <Pressable
      key={item.id}
      style={styles.categoryItem}
      onPress={() => {
        // Navigate to category filter page - you can implement this later
        // For now, we'll just close search or do nothing
      }}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
    </Pressable>
  );

  const hasResults = data && (data.services.length > 0 || data.packages.length > 0 || data.categories.length > 0);
  const hasSearchTerm = searchTerm.trim().length >= 2;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services, packages..."
            value={query}
            onChangeText={handleSearch}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {isLoading && hasSearchTerm && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0F766E" />
          </View>
        )}

        {!isLoading && hasSearchTerm && !hasResults && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search terms
            </Text>
          </View>
        )}

        {!hasSearchTerm && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>Search for anything</Text>
            <Text style={styles.emptySubtitle}>
              Find services, packages, and categories
            </Text>
          </View>
        )}

        {data && hasResults && (
          <>
            {data.categories.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryScroll}
                >
                  {data.categories.map(renderCategoryItem)}
                </ScrollView>
              </View>
            )}

            {data.services.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Services</Text>
                {data.services.map(renderServiceItem)}
              </View>
            )}

            {data.packages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Packages</Text>
                {data.packages.map(renderPackageItem)}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#0F172A",
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: "row",
  },
  categoryItem: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryName: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "500",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  resultCategory: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  resultPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F766E",
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0F172A",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 8,
  },
});