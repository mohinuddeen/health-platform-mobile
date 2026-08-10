// health-platform-mobile/app/addresses/index.tsx
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/src/components/layout/Header";
import { useAddresses, useDeleteAddress } from "@/src/hooks/useAddresses";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";

export default function AddressesScreen() {
  const router = useRouter();
  const { data: addresses = [], isLoading } = useAddresses();
  const deleteAddress = useDeleteAddress();

  function handleDelete(id: string) {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteAddress.mutate(id);
          },
        },
      ]
    );
  }

  const getAddressIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("home")) return "home-outline";
    if (lower.includes("office") || lower.includes("work")) return "business-outline";
    return "location-outline";
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>My Addresses</Text>
            <Text style={styles.subtitle}>
              {addresses.length} {addresses.length === 1 ? "address" : "addresses"} saved
            </Text>
          </View>
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/addresses/add")}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Addresses List */}
        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name="location-outline" size={48} color={Colors.light.primaryLight} />
            </View>
            <Text style={styles.emptyTitle}>No Addresses Saved</Text>
            <Text style={styles.emptyText}>Add your first address to get started</Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => router.push("/addresses/add")}
            >
              <Text style={styles.emptyButtonText}>Add Address</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={[styles.card, item.is_default && styles.defaultCard]}>
                {item.is_default && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}

                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleRow}>
                    <Ionicons
                      name={getAddressIcon(item.title)}
                      size={20}
                      color={item.is_default ? Colors.light.primary : Colors.light.textMuted}
                    />
                    <Text style={[styles.addressTitle, item.is_default && styles.defaultTitle]}>
                      {item.title}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.addressLine}>{item.address_line}</Text>
                  <Text style={styles.addressDetail}>
                    {item.area}, {item.city}
                  </Text>
                  <Text style={styles.addressDetail}>
                    {item.state}, {item.country}
                  </Text>
                  {item.postal_code && (
                    <Text style={styles.addressDetail}>Postal: {item.postal_code}</Text>
                  )}
                </View>

                <View style={styles.cardActions}>
                  <Pressable
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => router.push(`/addresses/${item.id}`)}
                  >
                    <Ionicons name="create-outline" size={18} color={Colors.light.primary} />
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color={Colors.light.danger} />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    marginTop: 2,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Shadow.md,
  },
  listContent: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadow.sm,
    position: "relative",
  },
  defaultCard: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  defaultBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderTopRightRadius: Radius.md,
    borderBottomLeftRadius: Radius.md,
  },
  defaultBadgeText: {
    color: "#FFFFFF",
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
  },
  cardHeader: {
    marginBottom: Spacing.sm,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  addressTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
  },
  defaultTitle: {
    color: Colors.light.primary,
  },
  cardBody: {
    gap: 2,
  },
  addressLine: {
    fontSize: Typography.size.base,
    color: Colors.light.text,
    fontWeight: Typography.weight.medium,
  },
  addressDetail: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
  },
  editButton: {
    backgroundColor: Colors.light.mintBg,
  },
  editButtonText: {
    color: Colors.light.primary,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
  },
  deleteButton: {
    backgroundColor: Colors.light.dangerBg,
  },
  deleteButtonText: {
    color: Colors.light.danger,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.xxxl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.light.mintBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.size.base,
    color: Colors.light.textMuted,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  emptyButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontWeight: Typography.weight.semibold,
    fontSize: Typography.size.base,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
});