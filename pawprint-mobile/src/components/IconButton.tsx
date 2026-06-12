import { Image, Pressable, StyleSheet } from "react-native";

type IconButtonProps = {
  source: any;
  onPress: () => void;
  size?: number;
};

export default function IconButton({
  source,
  onPress,
  size = 32,
}: IconButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          resizeMode: "contain",
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});