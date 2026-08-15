import { View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  index?: number;
  style?: ViewStyle;
}

// Animation removed — plain static wrapper kept only so existing
// imports don't need touching everywhere at once.
export default function AnimatedSection({ children, style }: Props) {
  return <View style={style}>{children}</View>;
}