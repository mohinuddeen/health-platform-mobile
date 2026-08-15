// health-platform-mobile/app/(auth)/signup.tsx
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
import { authService } from "@/src/services/auth.service";
import { Colors, Spacing, Typography, Radius, Shadow } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  async function handleSignup() {
    if (!agreedToTerms) {
      setError("Please agree to the Terms & Conditions");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authService.signup({
        full_name: fullName,
        phone,
        email,
        password,
      });

      router.replace("/(auth)/login");
    } catch (error) {
      setError("Unable to create account. Please try again.");
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
            Create Your <Text style={styles.titleAccent}>Account</Text>
          </Text>
          <Text style={styles.subtitle}>
            Join CareNest and start your healthcare journey
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={Colors.light.textMuted} style={styles.inputIcon} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor={Colors.light.textLight}
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color={Colors.light.textMuted} style={styles.inputIcon} />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={Colors.light.textLight}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

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

          {/* Password Requirements */}
          <View style={styles.passwordRequirements}>
            <View style={styles.requirementItem}>
              <Ionicons
                name={password.length >= 8 ? "checkmark-circle" : "ellipse-outline"}
                size={14}
                color={password.length >= 8 ? Colors.light.success : Colors.light.textMuted}
              />
              <Text style={[styles.requirementText, password.length >= 8 && styles.requirementMet]}>
                At least 8 characters
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <Ionicons
                name={/[A-Z]/.test(password) ? "checkmark-circle" : "ellipse-outline"}
                size={14}
                color={/[A-Z]/.test(password) ? Colors.light.success : Colors.light.textMuted}
              />
              <Text style={[styles.requirementText, /[A-Z]/.test(password) && styles.requirementMet]}>
                At least one uppercase letter
              </Text>
            </View>
            <View style={styles.requirementItem}>
              <Ionicons
                name={/[0-9]/.test(password) ? "checkmark-circle" : "ellipse-outline"}
                size={14}
                color={/[0-9]/.test(password) ? Colors.light.success : Colors.light.textMuted}
              />
              <Text style={[styles.requirementText, /[0-9]/.test(password) && styles.requirementMet]}>
                At least one number
              </Text>
            </View>
          </View>

          {/* Terms & Conditions */}
          <Pressable
            style={styles.termsContainer}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
              {agreedToTerms && (
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {" "}and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </Pressable>

          {/* Error Message */}
          {error !== "" && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={16} color={Colors.light.danger} />
              <Text style={styles.error}>{error}</Text>
            </View>
          )}

          {/* Sign Up Button */}
          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Create Account</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </View>
            )}
          </Pressable>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => router.replace("/(auth)/login")}>
              <Text style={styles.link}> Sign In</Text>
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
  passwordRequirements: {
    gap: 4,
    paddingHorizontal: Spacing.xs,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  requirementText: {
    fontSize: Typography.size.xs,
    color: Colors.light.textMuted,
  },
  requirementMet: {
    color: Colors.light.success,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: Colors.light.border,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  termsText: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: Colors.light.textMuted,
  },
  termsLink: {
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