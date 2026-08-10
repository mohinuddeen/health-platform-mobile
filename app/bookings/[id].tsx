// health-platform-mobile/app/bookings/[id].tsx
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  useState,
} from "react";
import Header from "@/src/components/layout/Header";
import {
  usePublicService,
} from "@/src/hooks/useServices";
import {
  usePackage,
} from "@/src/hooks/usePackages";
import {
  useTimeSlots,
} from "@/src/hooks/useTimeSlots";
import {
  useAddresses,
} from "@/src/hooks/useAddresses";
import {
  useFamilyMembers,
} from "@/src/hooks/useFamilyMembers";
import {
  useCreateBooking,
} from "@/src/hooks/useBookings";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

export default function BookingScreen() {
  const router = useRouter();
  const {
    id,
    type,
    step = "1",
    date,
    slot,
    address,
    familyMember,
    notes: routeNotes,
  } = useLocalSearchParams<{
    id: string;
    type?: string;
    step?: string;
    date?: string;
    slot?: string;
    address?: string;
    familyMember?: string;
    notes?: string;
  }>();

  const isAuthenticated = useSelector(
  (state: RootState) => state.auth.isAuthenticated
);
if (!isAuthenticated) {
  router.replace("/(auth)/login");
  return null;
}

  const isPackage = type === "package";

  const {
    data: service,
  } = usePublicService(isPackage ? "" : id, {
    enabled: !isPackage && !!id,
  });

  const {
    data: packageData,
  } = usePackage(isPackage ? id : "", {
    enabled: isPackage && !!id,
  });

  const {
    data: timeSlots = [],
  } = useTimeSlots();
  const {
    data: addresses = [],
  } = useAddresses();
  const {
    data: familyMembers = [],
  } = useFamilyMembers();
  const createBooking = useCreateBooking();

  const [selectedDate, setSelectedDate] =
    useState<string>(date ?? "");
  const [selectedSlot, setSelectedSlot] =
    useState<string>(slot ?? "");
  const [selectedAddress, setSelectedAddress] =
    useState<string>(address ?? "");
  const [selectedFamilyMember, setSelectedFamilyMember] =
    useState<string>(familyMember ?? "");
  const [notes, setNotes] =
    useState<string>(routeNotes ?? "");

  const itemTitle = isPackage
    ? packageData?.title
    : service?.title;

  function goToStep2() {
    if (
      !selectedDate ||
      !selectedSlot
    ) {
      return;
    }
    router.push({
      pathname: `/bookings/${id}`,
      params: {
        type,
        step: "2",
        date: selectedDate,
        slot: selectedSlot,
      },
    });
  }

  function goToStep3() {
    if (!selectedAddress) {
      return;
    }
    router.push({
      pathname: `/bookings/${id}`,
      params: {
        type,
        step: "3",
        date: selectedDate,
        slot: selectedSlot,
        address: selectedAddress,
        familyMember: "",
      },
    });
  }

  function goToStep4() {
    if (!selectedFamilyMember) {
      return;
    }
    router.push({
      pathname: `/bookings/${id}`,
      params: {
        type,
        step: "4",
        date: selectedDate,
        slot: selectedSlot,
        address: selectedAddress,
        familyMember: selectedFamilyMember,
        notes,
      },
    });
  }

  function confirmBooking() {
    if (
      !id ||
      !selectedDate ||
      !selectedSlot ||
      !selectedAddress ||
      !selectedFamilyMember
    ) {
      return;
    }

    const bookingData = isPackage
      ? {
          package_id: id,
          date: selectedDate,
          time_slot_id: selectedSlot,
          address_id: selectedAddress,
          family_member_id: selectedFamilyMember,
          notes,
        }
      : {
          service_id: id,
          date: selectedDate,
          time_slot_id: selectedSlot,
          address_id: selectedAddress,
          family_member_id: selectedFamilyMember,
          notes,
        };

    createBooking.mutate(
      bookingData,
      {
        onSuccess: () => {
          router.replace(
            "/(tabs)/bookings"
          );
        },
      }
    );
  }

  const title = isPackage ? "Book Package" : "Book Service";

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>
          {title}
        </Text>
        {
          step === "1" && (
            <>
              <Text style={styles.step}>
                Step 1
              </Text>
              <Text style={styles.heading}>
                Select Date
              </Text>
              <Pressable
                style={[
                  styles.card,
                  selectedDate &&
                  styles.selectedCard,
                ]}
                onPress={() =>
                  setSelectedDate(
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  )
                }
              >
                <Text>
                  {
                    selectedDate ||
                    "Select Today"
                  }
                </Text>
              </Pressable>
              <Text style={styles.heading}>
                Select Time Slot
              </Text>
              {
                timeSlots.map((item) => (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.card,
                      selectedSlot === item.id &&
                      styles.selectedCard,
                    ]}
                    onPress={() =>
                      setSelectedSlot(item.id)
                    }
                  >
                    <Text>
                      {item.slot}
                    </Text>
                  </Pressable>
                ))
              }
              <Pressable
                style={styles.button}
                onPress={goToStep2}
              >
                <Text style={styles.buttonText}>
                  Continue
                </Text>
              </Pressable>
            </>
          )
        }
        {
          step === "2" && (
            <>
              <Text style={styles.step}>
                Step 2
              </Text>
              <Text style={styles.heading}>
                Select Address
              </Text>
              {
                addresses.map((item) => (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.card,
                      selectedAddress === item.id &&
                      styles.selectedCard,
                    ]}
                    onPress={() =>
                      setSelectedAddress(item.id)
                    }
                  >
                    <Text style={styles.cardTitle}>
                      {item.title}
                    </Text>
                    <Text>
                      {item.address_line}
                    </Text>
                    <Text>
                      {item.city}, {item.state}
                    </Text>
                  </Pressable>
                ))
              }
              <Pressable
                style={styles.addCard}
                onPress={() =>
                  router.push("/addresses/add")
                }
              >
                <Text style={styles.addText}>
                  + Add New Address
                </Text>
              </Pressable>
              <View style={styles.row}>
                <Pressable
                  style={styles.backButton}
                  onPress={() =>
                    router.back()
                  }
                >
                  <Text>
                    Back
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.buttonSmall}
                  onPress={goToStep3}
                >
                  <Text style={styles.buttonText}>
                    Continue
                  </Text>
                </Pressable>
              </View>
            </>
          )
        }
        {
          step === "3" && (
            <>
              <Text style={styles.step}>
                Step 3
              </Text>
              <Text style={styles.heading}>
                Select Family Member
              </Text>
              {
                familyMembers.map((item) => (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.card,
                      selectedFamilyMember === item.id &&
                      styles.selectedCard,
                    ]}
                    onPress={() =>
                      setSelectedFamilyMember(item.id)
                    }
                  >
                    <Text style={styles.cardTitle}>
                      {item.name}
                    </Text>
                    <Text>
                      {item.relation}
                    </Text>
                    <Text>
                      Age: {item.age}
                    </Text>
                  </Pressable>
                ))
              }
              <Pressable
                style={styles.addCard}
                onPress={() =>
                  router.push(
                    "/family-members/add"
                  )
                }
              >
                <Text style={styles.addText}>
                  + Add Family Member
                </Text>
              </Pressable>
              <View style={styles.row}>
                <Pressable
                  style={styles.backButton}
                  onPress={() =>
                    router.back()
                  }
                >
                  <Text>
                    Back
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.buttonSmall}
                  onPress={goToStep4}
                >
                  <Text style={styles.buttonText}>
                    Continue
                  </Text>
                </Pressable>
              </View>
            </>
          )
        }
        {
          step === "4" && (
            <>
              <Text style={styles.step}>
                Step 4
              </Text>
              <Text style={styles.heading}>
                Review Booking
              </Text>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  {isPackage ? "Package" : "Service"}
                </Text>
                <Text>
                  {itemTitle}
                </Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  Date
                </Text>
                <Text>
                  {selectedDate}
                </Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  Time
                </Text>
                <Text>
                  {
                    timeSlots.find(
                      item =>
                        item.id === selectedSlot
                    )?.slot
                  }
                </Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  Address
                </Text>
                <Text>
                  {
                    addresses.find(
                      item =>
                        item.id === selectedAddress
                    )?.address_line
                  }
                </Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  Family Member
                </Text>
                <Text>
                  {
                    familyMembers.find(
                      item =>
                        item.id === selectedFamilyMember
                    )?.name
                  }
                </Text>
              </View>
              <TextInput
                style={[
                  styles.card,
                  styles.notesInput,
                ]}
                placeholder="Notes"
                multiline
                value={notes}
                onChangeText={setNotes}
              />
              <View style={styles.row}>
                <Pressable
                  style={styles.backButton}
                  onPress={() =>
                    router.back()
                  }
                >
                  <Text>
                    Back
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.buttonSmall}
                  onPress={confirmBooking}
                >
                  <Text style={styles.buttonText}>
                    {
                      createBooking.isPending
                      ? "Confirming..."
                      : "Confirm Booking"
                    }
                  </Text>
                </Pressable>
              </View>
            </>
          )
        }
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F766E",
  },
  heading: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  selectedCard: {
    borderColor: "#0F766E",
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: 5,
  },
  addCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#0F766E",
  },
  addText: {
    color: "#0F766E",
    fontWeight: "700",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#0F766E",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonSmall: {
    flex: 1,
    backgroundColor: "#0F766E",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  backButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});