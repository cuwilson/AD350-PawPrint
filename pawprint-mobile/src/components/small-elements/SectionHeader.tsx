import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { scale, sizes } from "@/styles/sizes";

type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      {/* Reusable title bar used above dashboard sections */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tileBackground,
    borderWidth: scale(3),
    borderColor: colors.brand,
    borderRadius: sizes.borderRadius,

    paddingVertical: scale(10),
    paddingHorizontal: scale(12),

    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: colors.accentContrast,
    fontSize: scale(24),
    fontWeight: "800",
    textAlign: "center",
  },
});