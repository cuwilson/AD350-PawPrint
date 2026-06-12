import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/styles/colors";
import { scale } from "@/styles/sizes";

type FloatingAddButtonProps = {
  onPress: () => void;
};

export default function FloatingAddButton({
  onPress,
}: FloatingAddButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.plus}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: scale(44),
    height: scale(44),

    borderRadius: scale(22),

    backgroundColor: colors.brand,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: colors.accentContrast,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  plus: {
  color: colors.background,
  fontSize: scale(43),
  fontWeight: "700",
  // Adjust vertical alignment of the plus sign
  top: -6,
},
});