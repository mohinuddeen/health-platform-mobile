// health-platform-mobile/app/(tabs)/bookings.tsx
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useBookings } from "@/src/hooks/useBookings";
import { Booking } from "@/src/services/booking.service";
import { RootState } from "@/src/store";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Header from "@/src/components/layout/Header";

export default function BookingsScreen() {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { data: bookings, isLoading, error } = useBookings();
  const [filter, setFilter] = useState<string>("all");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  // Get status counts
  const statusCounts = {
    all: bookings?.length || 0,
    pending: bookings?.filter(b => b.status === "pending").length || 0,
    confirmed: bookings?.filter(b => b.status === "confirmed").length || 0,
    completed: bookings?.filter(b => b.status === "completed").length || 0,
    cancelled: bookings?.filter(b => b.status === "cancelled").length || 0,
  };

  // Filter bookings
  const filteredBookings = bookings?.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const filterOptions = [
    { id: "all", label: "All Bookings", icon: "calendar-outline" },
    { id: "pending", label: "Pending", icon: "time-outline" },
    { id: "confirmed", label: "Confirmed", icon: "checkmark-circle-outline" },
    { id: "completed", label: "Completed", icon: "checkmark-done-circle-outline" },
    { id: "cancelled", label: "Cancelled", icon: "close-circle-outline" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return Colors.light.warning;
      case "confirmed":
        return Colors.light.info;
      case "completed":
        return Colors.light.success;
      case "cancelled":
        return Colors.light.danger;
      default:
        return Colors.light.textMuted;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "time-outline";
      case "confirmed":
        return "checkmark-circle-outline";
      case "completed":
        return "checkmark-done-circle-outline";
      case "cancelled":
        return "close-circle-outline";
      default:
        return "ellipse-outline";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <View style={styles.centeredCard}>
          <View style={styles.centeredIcon}>
            <Ionicons name="calendar-outline" size={48} color={Colors.light.primaryLight} />
          </View>
          <Text style={styles.centeredTitle}>No Bookings Yet</Text>
          <Text style={styles.centeredText}>Please login to view your bookings</Text>
          <Pressable
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (error) {
    if (error.message?.includes("401") || error.message?.includes("403")) {
      return (
        <View style={styles.centered}>
          <View style={styles.centeredCard}>
            <View style={[styles.centeredIcon, styles.errorIcon]}>
              <Ionicons name="alert-circle" size={48} color={Colors.light.danger} />
            </View>
            <Text style={styles.centeredTitle}>Session Expired</Text>
            <Text style={styles.centeredText}>Please login again to continue</Text>
            <Pressable
              style={styles.loginButton}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.centered}>
        <View style={styles.centeredCard}>
          <View style={[styles.centeredIcon, styles.errorIcon]}>
            <Ionicons name="alert-circle" size={48} color={Colors.light.danger} />
          </View>
          <Text style={styles.centeredTitle}>Something went wrong</Text>
          <Text style={styles.centeredText}>Failed to load your bookings</Text>
          <Pressable
            style={styles.retryButton}
            onPress={() => window.location.reload()}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <View style={styles.screen}>
        <Header />
        <View style={styles.centered}>
          <View style={styles.centeredCard}>
            <View style={styles.centeredIcon}>
              <Ionicons name="calendar-outline" size={48} color={Colors.light.primaryLight} />
            </View>
            <Text style={styles.centeredTitle}>No Bookings Yet</Text>
            <Text style={styles.centeredText}>Start your healthcare journey today</Text>
            <Pressable
              style={styles.bookButton}
              onPress={() => router.push("/(tabs)/services")}
            >
              <Text style={styles.bookButtonText}>Browse Services</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Booking }) => {
    const title = item.packages
      ? `${item.packages.title} - ${item.services?.title}`
      : item.services?.title || "Service";

    return (
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/bookings/details/${item.id}`)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.serviceTitle} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Ionicons name={getStatusIcon(item.status)} size={12} color="#FFFFFF" />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors.light.textMuted} />
            <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.cardRow}>
            <Ionicons name="time-outline" size={16} color={Colors.light.textMuted} />
            <Text style={styles.slotText}>{item.time_slots?.slot || "Time not set"}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <View style={styles.memberBadge}>
              <Ionicons name="person-outline" size={14} color={Colors.light.primary} />
              <Text style={styles.memberText}>
                {item.family_members?.name || "Self"}
                {item.family_members?.relation && ` • ${item.family_members.relation}`}
              </Text>
            </View>
          </View>
          <Text style={styles.priceText}>AED {item.service_price}</Text>
        </View>

        {item.addresses && (
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={14} color={Colors.light.textMuted} />
            <Text style={styles.addressText} numberOfLines={1}>
              {item.addresses.address_line || item.address_snapshot?.address_line || "Address not set"}
            </Text>
          </View>
        )}
      </Pressable>
    );
  };

  const getFilterLabel = () => {
    const option = filterOptions.find(f => f.id === filter);
    return option ? option.label : "All Bookings";
  };

  return (
    <View style={styles.screen}>
      <Header />

      <View style={styles.container}>
        {/* Header with Title and Filter Icon */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.pageTitle}>My Bookings</Text>
            <Text style={styles.pageSubtitle}>
              {filteredBookings?.length || 0} {filteredBookings?.length === 1 ? "booking" : "bookings"} found
            </Text>
          </View>
          <Pressable
            style={styles.filterButton}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Ionicons name="options-outline" size={24} color={Colors.light.primary} />
            <Text style={styles.filterButtonText}>{getFilterLabel()}</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.light.primary} />
          </Pressable>
        </View>

        {/* Bookings List */}
        <FlatList
          data={filteredBookings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={48} color={Colors.light.textMuted} />
              <Text style={styles.emptyText}>No {filter} bookings found</Text>
            </View>
          }
        />

        {/* Filter Modal */}
        <Modal
          visible={isFilterModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsFilterModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsFilterModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Bookings</Text>
                <Pressable
                  onPress={() => setIsFilterModalVisible(false)}
                  style={styles.modalClose}
                >
                  <Ionicons name="close" size={24} color={Colors.light.textMuted} />
                </Pressable>
              </View>

              <View style={styles.modalBody}>
                {filterOptions.map((option) => {
                  const isActive = filter === option.id;
                  const count = statusCounts[option.id as keyof typeof statusCounts] || 0;

                  return (
                    <Pressable
                      key={option.id}
                      style={[
                        styles.filterOption,
                        isActive && styles.filterOptionActive,
                      ]}
                      onPress={() => {
                        setFilter(option.id);
                        setIsFilterModalVisible(false);
                      }}
                    >
                      <View style={styles.filterOptionLeft}>
                        <Ionicons
                          name={option.icon as any}
                          size={20}
                          color={isActive ? Colors.light.primary : Colors.light.textMuted}
                        />
                        <Text
                          style={[
                            styles.filterOptionText,
                            isActive && styles.filterOptionTextActive,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </View>
                      <View style={styles.filterOptionRight}>
                        <Text style={styles.filterOptionCount}>{count}</Text>
                        {isActive && (
                          <Ionicons name="checkmark" size={20} color={Colors.light.primary} />
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </Pressable>
        </Modal>
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
    paddingTop: Spacing.md,
  },
  // Header Row
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  pageTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
  },
  pageSubtitle: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    marginTop: 2,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.light.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadow.sm,
  },
  filterButtonText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium,
    color: Colors.light.text,
    marginHorizontal: 4,
  },
  // List
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  serviceTitle: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
    flex: 1,
    marginRight: Spacing.sm,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold,
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  cardBody: {
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  dateText: {
    fontSize: Typography.size.sm,
    color: Colors.light.text,
  },
  slotText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
    paddingTop: Spacing.sm,
  },
  footerLeft: {
    flex: 1,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  memberText: {
    fontSize: Typography.size.sm,
    color: Colors.light.text,
    fontWeight: Typography.weight.medium,
  },
  priceText: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: Colors.light.primary,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
  },
  addressText: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    flex: 1,
  },
  // Empty States
  emptyContainer: {
    alignItems: "center",
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: Typography.size.base,
    color: Colors.light.textMuted,
  },
  // Centered States
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xxl,
    backgroundColor: Colors.light.background,
  },
  centeredCard: {
    alignItems: "center",
    gap: Spacing.md,
    maxWidth: 300,
  },
  centeredIcon: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.light.mintBg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  errorIcon: {
    backgroundColor: Colors.light.dangerBg,
  },
  centeredTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    textAlign: "center",
  },
  centeredText: {
    fontSize: Typography.size.base,
    color: Colors.light.textMuted,
    textAlign: "center",
  },
  // Buttons
  bookButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontWeight: Typography.weight.semibold,
    fontSize: Typography.size.base,
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    ...Shadow.sm,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: Typography.weight.semibold,
    fontSize: Typography.size.base,
  },
  retryButton: {
    backgroundColor: Colors.light.surface,
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Shadow.sm,
  },
  retryButtonText: {
    color: Colors.light.text,
    fontWeight: Typography.weight.semibold,
    fontSize: Typography.size.base,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.light.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingBottom: Spacing.xxxl,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.borderLight,
  },
  modalTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semibold,
    color: Colors.light.text,
  },
  modalClose: {
    padding: Spacing.xs,
  },
  modalBody: {
    padding: Spacing.lg,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    marginBottom: Spacing.xs,
  },
  filterOptionActive: {
    backgroundColor: Colors.light.mintBg,
  },
  filterOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  filterOptionText: {
    fontSize: Typography.size.base,
    color: Colors.light.text,
  },
  filterOptionTextActive: {
    color: Colors.light.primary,
    fontWeight: Typography.weight.semibold,
  },
  filterOptionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  filterOptionCount: {
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
    fontWeight: Typography.weight.medium,
  },
});