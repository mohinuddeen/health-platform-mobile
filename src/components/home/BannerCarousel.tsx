//health-platform-mobile/src/components/home/BannerCarousel.tsx
import { Text, View } from "react-native";
import { Banner } from "@/src/types/home";

interface Props {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: Props) {
  return (
    <View>
      {banners.map((banner) => (
        <View key={banner.id}>
          <Text>{banner.title}</Text>
        </View>
      ))}
    </View>
  );
}