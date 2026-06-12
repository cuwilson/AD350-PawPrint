import { Image, ImageSourcePropType, Pressable, StyleSheet } from "react-native";
import { sizes } from "@/styles/sizes";

type IconButtonProps = {
  source: ImageSourcePropType;
  onPress: () => void;
  size?: number;
};

export default function IconButton({
  source,
  onPress,
  size = sizes.iconMedium,
}: IconButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Image
        source={source}
        style={[
          styles.icon,
          {
            width: size,
            height: size,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: sizes.iconPadding,
  },

  icon: {
    resizeMode: "contain",
  },
});