import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Header from "@/src/components/layout/Header";

import {
  useDeleteFamilyMember,
  useFamilyMembers,
} from "@/src/hooks/useFamilyMembers";


export default function FamilyMembersScreen() {

  const router = useRouter();

  const {
    data: familyMembers = [],
    isLoading,
  } = useFamilyMembers();

  const deleteFamilyMember =
    useDeleteFamilyMember();


  function handleDelete(id: string) {

    Alert.alert(
      "Delete Family Member",
      "Are you sure you want to delete this family member?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteFamilyMember.mutate(id);
          },
        },
      ]
    );

  }


  return (

    <View style={styles.screen}>

      <Header />

      <View style={styles.container}>

        <View style={styles.headerRow}>

          <Text style={styles.title}>
            Family Members
          </Text>

          <Pressable
            style={styles.addButton}
            onPress={() =>
              router.push("/family-members/add")
            }
          >

            <Ionicons
              name="add"
              size={22}
              color="#FFFFFF"
            />

          </Pressable>

        </View>


        {
          isLoading ? (

            <Text style={styles.loading}>
              Loading...
            </Text>

          ) : familyMembers.length === 0 ? (

            <View style={styles.empty}>

              <Ionicons
                name="people-outline"
                size={48}
                color="#94A3B8"
              />

              <Text style={styles.emptyTitle}>
                No Family Members
              </Text>

              <Text style={styles.emptyText}>
                Add a family member to manage their information.
              </Text>

            </View>

          ) : (

            <FlatList

              data={familyMembers}

              keyExtractor={(item) => item.id}

              contentContainerStyle={
                styles.list
              }

              renderItem={({ item }) => (

                <View style={styles.card}>

                  <View style={styles.avatar}>

                    <Ionicons
                      name="person"
                      size={24}
                      color="#FFFFFF"
                    />

                  </View>


                  <View style={styles.info}>

                    <Text style={styles.name}>
                      {item.name}
                    </Text>

                    <Text style={styles.detail}>
                      {item.relation}
                    </Text>

                    <Text style={styles.detail}>
                      Age: {item.age}
                    </Text>

                  </View>


                  <View style={styles.actions}>

                    <Pressable
                      onPress={() =>
                        router.push(
                          `/family-members/${item.id}`
                        )
                      }
                    >

                      <Ionicons
                        name="create-outline"
                        size={22}
                        color="#0F766E"
                      />

                    </Pressable>


                    <Pressable
                      onPress={() =>
                        handleDelete(item.id)
                      }
                    >

                      <Ionicons
                        name="trash-outline"
                        size={22}
                        color="#DC2626"
                      />

                    </Pressable>

                  </View>

                </View>

              )}

            />

          )
        }

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
    flex: 1,
    padding: 16,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0F766E",
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    color: "#64748B",
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#0F766E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  detail: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 2,
  },

  actions: {
    flexDirection: "row",
    gap: 18,
    marginLeft: 12,
  },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
  },

});