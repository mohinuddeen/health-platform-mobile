// health-platform-mobile/app/bookings/details/[id].tsx
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  useBooking,
  useCancelBooking,
} from "@/src/hooks/useBookings";
import Header from "@/src/components/layout/Header";

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: booking,
    isLoading,
    isError,
  } = useBooking(id);
  const cancelMutation = useCancelBooking();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0F766E" />
      </View>
    );
  }

  if (isError || !booking) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Booking not found</Text>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleCancel = () => {
    cancelMutation.mutate(id, {
      onSuccess: () => {
        router.replace("/(tabs)/bookings");
      },
      onError: () => {
        // Error is handled by the mutation
      },
    });
  };

  const bookingTitle = booking.packages
    ? `${booking.packages.title} - ${booking.services?.title}`
    : booking.services?.title || "Service";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#F59E0B";
      case "confirmed":
        return "#3B82F6";
      case "completed":
        return "#10B981";
      case "cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
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

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Booking Details</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
              <Text style={styles.statusText}>{booking.status}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Service</Text>
              <Text style={styles.value}>{bookingTitle}</Text>
            </View>

            {booking.packages && (
              <View style={styles.detailRow}>
                <Text style={styles.label}>Package</Text>
                <Text style={styles.value}>{booking.packages.title}</Text>
              </View>
            )}

            <View style={styles.detailRow}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{formatDate(booking.date)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{booking.time_slots?.slot || "-"}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Price</Text>
              <Text style={[styles.value, styles.priceText]}>AED {booking.service_price}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Payment Method</Text>
              <Text style={styles.value}>Cash on Delivery (COD)</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Payment Status</Text>
              <Text style={styles.value}>Pending</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Patient</Text>
              <Text style={styles.value}>{booking.family_members?.name || "Self"}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Relation</Text>
              <Text style={styles.value}>{booking.family_members?.relation || "-"}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value} numberOfLines={2}>
                {booking.addresses?.address_line || booking.address_snapshot?.address_line || "-"}
              </Text>
            </View>

            {booking.notes && (
              <View style={styles.detailRow}>
                <Text style={styles.label}>Notes</Text>
                <Text style={styles.value}>{booking.notes}</Text>
              </View>
            )}
          </View>

          {booking.status !== "cancelled" && (
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.cancelButton}
                onPress={handleCancel}
                disabled={cancelMutation.isPending}
              >
                <Text style={styles.cancelButtonText}>
                  {cancelMutation.isPending ? "Cancelling..." : "Cancel Booking"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#0F766E",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
    flexShrink: 0,
    marginRight: 12,
  },
  value: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
  priceText: {
    color: "#0F766E",
    fontWeight: "700",
  },
  buttonContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  cancelButton: {
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});