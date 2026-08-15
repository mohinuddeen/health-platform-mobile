// health-platform-mobile/app/(auth)/login.tsx
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { authService } from "@/src/services/auth.service";
import { loginSuccess } from "@/src/store/slices/authSlice";
import { saveAuthData } from "@/src/utils/authStorage";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const response = await authService.login({
        email,
        password,
      });

      dispatch(
        loginSuccess({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          userId: response.user_id,
        })
      );

      await saveAuthData({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        userId: response.user_id,
      });

      router.replace("/(tabs)");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Arrow */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
        </TouchableOpacity>

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>CN</Text>
          </View>
          <Text style={styles.title}>
            Welcome Back to{" "}
            <Text style={styles.titleAccent}>CareNest</Text>
          </Text>
          <Text style={styles.subtitle}>
            Sign in to continue your healthcare journey
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={Colors.light.textMuted} style={styles.inputIcon} />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={Colors.light.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={Colors.light.textMuted} style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.light.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={Colors.light.textMuted}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Error Message */}
          {error !== "" && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={Colors.light.danger} />
              <Text style={styles.error}>{error}</Text>
            </View>
          )}

          {/* Login Button */}
          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            )}
          </Pressable>

          {/* Sign Up Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Pressable onPress={() => router.push("/(auth)/signup")}>
              <Text style={styles.link}> Create one now</Text>
            </Pressable>
          </View>

          {/* Trust Badges */}
          <View style={styles.trustBadges}>
            <View style={styles.trustItem}>
              <Ionicons name="shield-checkmark-outline" size={14} color={Colors.light.primary} />
              <Text style={styles.trustText}>Secure & Encrypted</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Ionicons name="time-outline" size={14} color={Colors.light.primary} />
              <Text style={styles.trustText}>24/7 Support</Text>
            </View>
            <View style={styles.trustDivider} />
            <View style={styles.trustItem}>
              <Ionicons name="medical-outline" size={14} color={Colors.light.primary} />
              <Text style={styles.trustText}>Trusted Care</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.xl,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: Spacing.lg,
    zIndex: 10,
    padding: Spacing.xs,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xxxl,
    marginTop: Spacing.xxxl,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: Radius.xl,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
    ...Shadow.md,
  },
  logoText: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold,
    color: "#FFFFFF",
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
    textAlign: "center",
  },
  titleAccent: {
    color: Colors.light.primary,
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.light.textMuted,
    textAlign: "center",
    marginTop: Spacing.xs,
  },
  formContainer: {
    gap: Spacing.md,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    ...Shadow.sm,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.light.text,
  },
  eyeIcon: {
    padding: Spacing.xs,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: Typography.size.sm,
    color: Colors.light.primary,
    fontWeight: Typography.weight.medium,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.light.dangerBg,
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  error: {
    flex: 1,
    color: Colors.light.danger,
    fontSize: Typography.size.sm,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: Spacing.sm,
    ...Shadow.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
  footerText: {
    fontSize: Typography.size.base,
    color: Colors.light.textMuted,
  },
  link: {
    fontSize: Typography.size.base,
    color: Colors.light.primary,
    fontWeight: Typography.weight.semibold,
  },
  trustBadges: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  trustItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trustText: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
  },
  trustDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.light.border,
  },
});