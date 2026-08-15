//health-platform-mobile/src/components/layout/SearchBar.tsx
import { TextInput, StyleSheet } from "react-native";

export default function SearchBar() {
  return (
    <TextInput
      placeholder="Search services..."
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    borderRadius: 8,
  },
});