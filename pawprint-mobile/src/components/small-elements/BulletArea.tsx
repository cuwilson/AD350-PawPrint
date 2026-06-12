import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { scale, sizes } from "@/styles/sizes";

const bulletIcon = require("@/assets/images/bullet-point.png");

type BulletAreaProps = {
  items: string[];
};

export default function BulletArea({
  items,
}: BulletAreaProps) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View
          key={`${item}-${index}`}
          style={styles.row}
        >
          {/* Bullet icon */}
          <Image
            source={bulletIcon}
            style={styles.bullet}
          />

          {/* Item text */}
          <Text style={styles.text}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tileBackground,

    paddingVertical: scale(18),
    paddingHorizontal: scale(18),

    borderRadius: sizes.borderRadius,

    gap: scale(12),

    shadowColor: colors.accentContrast,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },

  bullet: {
    width: scale(14),
    height: scale(14),
    resizeMode: "contain",
  },

  text: {
    flex: 1,

    color: colors.accentContrast,
    fontSize: scale(16),
    fontWeight: "600",
  },
});