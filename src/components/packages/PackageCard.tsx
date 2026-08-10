import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { Package } from "@/src/types/package";


interface Props {
  pkg: Package;
}


export default function PackageCard({
  pkg,
}: Props) {

  const router = useRouter();


  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/packages/[id]",
          params: {
            id: pkg.id,
          },
        })
      }
    >

      <Image
        source={{
          uri: pkg.image_url,
        }}
        style={styles.image}
      />


      <View>

        <Text style={styles.title}>
          {pkg.title}
        </Text>


        <Text
          numberOfLines={2}
          style={styles.description}
        >
          {pkg.description}
        </Text>


        <Text style={styles.price}>
          AED {pkg.discount_price ?? pkg.price}
        </Text>

      </View>

    </Pressable>
  );
}



const styles = StyleSheet.create({

  card: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 12,
  },


  image: {
    width: "100%",
    height: 110,
  },


  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 10,
    marginHorizontal: 10,
  },


  description: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    marginHorizontal: 10,
  },


  price: {
    marginTop: 10,
    marginBottom: 12,
    marginHorizontal: 10,
    fontWeight: "700",
    color: "#0F766E",
  },

});