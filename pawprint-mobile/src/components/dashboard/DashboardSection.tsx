import { StyleSheet, View } from "react-native";
import SectionHeader from "@/components/small-elements/SectionHeader";
import BulletArea from "@/components/small-elements/BulletArea";
import FloatingAddButton from "@/components/small-elements/FloatingAddButton";
import { scale } from "@/styles/sizes";

type DashboardSectionProps = {
  title: string;
  items: string[];
  onAddPress: () => void;
};

export default function DashboardSection({
  title,
  items,
  onAddPress,
}: DashboardSectionProps) {
  return (
    <View style={styles.container}>
      <SectionHeader title={title} />

      <View style={styles.body}>
        <BulletArea items={items} />

        {/* Positioned over the lower-right corner of the bullet area */}
        <View style={styles.addButtonWrapper}>
          <FloatingAddButton onPress={onAddPress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: scale(10),
  },

  body: {
    position: "relative",
    marginBottom: scale(32), // Extra space to accommodate the floating button
  },

  addButtonWrapper: {
    position: "absolute",
    right: scale(12),
    bottom: scale(-18),
  },
});