// health-platform-mobile/app/(tabs)/profile.tsx
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";

import Header from "@/src/components/layout/Header";

import { RootState } from "@/src/store";
import { logout } from "@/src/store/slices/authSlice";
import { clearAuthData } from "@/src/utils/authStorage";

import { useProfile } from "@/src/hooks/useProfile";


function MenuItem({
  icon,
  title,
  onPress,
  disabled = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      style={[
        styles.menuItem,
        disabled && styles.menuItemDisabled,
      ]}
      onPress={
        disabled
          ? () => Alert.alert("Login Required", "Please login to access this feature.")
          : onPress ??
            (() =>
              Alert.alert(
                "Coming Soon",
                `${title} will be added later.`
              ))
      }
    >
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={disabled ? "#94A3B8" : "#0F172A"}
        />
        <Text style={[styles.menuText, disabled && styles.menuTextDisabled]}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={disabled ? "#CBD5E1" : "#94A3B8"}
      />
    </Pressable>
  );
}


export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    isAuthenticated,
  } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    data: profile,
    isLoading,
  } = useProfile();

  async function handleLogout() {
    await clearAuthData();
    dispatch(logout());
  }

  if (isAuthenticated && isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#0F766E"
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header />

      <View style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={34}
              color="#FFFFFF"
            />
          </View>

          {
            isAuthenticated ? (
              <>
                <Text style={styles.name}>
                  {profile?.full_name}
                </Text>

                <Text style={styles.email}>
                  {profile?.email}
                </Text>

                <View style={styles.stats}>
                  <Text style={styles.statText}>
                    Bookings: {profile?.stats.bookings ?? 0}
                  </Text>

                  <Text style={styles.statText}>
                    Family: {profile?.stats.family_members ?? 0}
                  </Text>
                </View>

                <Pressable
                  style={styles.logoutButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.logoutText}>
                    Logout
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.name}>
                  Guest User
                </Text>

                <Text style={styles.email}>
                  Sign in to manage your profile and bookings.
                </Text>

                <Pressable
                  style={styles.loginButton}
                  onPress={() =>
                    router.push("/(auth)/login")
                  }
                >
                  <Text style={styles.loginText}>
                    Login
                  </Text>
                </Pressable>
              </>
            )
          }
        </View>

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.card}>
          <MenuItem
            icon="person-outline"
            title="Personal Information"
            disabled={!isAuthenticated}
          />

          <MenuItem
            icon="location-outline"
            title="My Addresses"
            onPress={() =>
              router.push("/addresses")
            }
            disabled={!isAuthenticated}
          />

          <MenuItem
            icon="people-outline"
            title="Family Members"
            onPress={() =>
              router.push("/family-members")
            }
            disabled={!isAuthenticated}
          />

          <MenuItem
            icon="calendar-outline"
            title="My Bookings"
            onPress={() =>
              router.push("/(tabs)/bookings")
            }
            disabled={!isAuthenticated}
          />
        </View>

        <Text style={styles.sectionTitle}>
          Support
        </Text>

        <View style={styles.card}>
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
          />

          <MenuItem
            icon="document-text-outline"
            title="Privacy Policy"
          />
        </View>
      </View>
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
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#0F766E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  email: {
    color: "#64748B",
    marginTop: 6,
    textAlign: "center",
  },

  stats: {
    flexDirection: "row",
    gap: 20,
    marginTop: 12,
  },

  statText: {
    color: "#0F766E",
    fontWeight: "600",
  },

  logoutButton: {
    marginTop: 16,
    backgroundColor: "#DC2626",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  loginButton: {
    marginTop: 16,
    backgroundColor: "#0F766E",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },

  loginText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#0F172A",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },

  menuItemDisabled: {
    opacity: 0.6,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menuText: {
    fontSize: 16,
    color: "#0F172A",
  },

  menuTextDisabled: {
    color: "#94A3B8",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});