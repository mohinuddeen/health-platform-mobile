//health-platform-mobile/app/packages/index.tsx
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Header from "@/src/components/layout/Header";
import PackageCard from "@/src/components/packages/PackageCard";
import { usePackages } from "@/src/hooks/usePackages";


export default function PackagesScreen() {

  const {
    data,
    isLoading,
    error,
  } = usePackages();


  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#0F766E"
        />
      </View>
    );
  }


  if (error) {
    return (
      <View style={styles.center}>
        <Text>
          Failed to load packages.
        </Text>
      </View>
    );
  }


  return (
    <View style={styles.screen}>

      <Header />

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}

        numColumns={2}

        columnWrapperStyle={styles.row}

        contentContainerStyle={styles.container}

        ListHeaderComponent={
          <Text style={styles.title}>
            Packages
          </Text>
        }

        renderItem={({ item }) => (
          <View style={styles.item}>
            <PackageCard
              pkg={item}
            />
          </View>
        )}
      />

    </View>
  );
}


const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    padding: 12,
  },

  row: {
    justifyContent: "space-between",
  },

  item: {
    width: "48%",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});