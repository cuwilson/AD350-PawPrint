import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { scale, sizes } from "@/styles/sizes";

type AddEditPanelProps = {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function AddEditPanel({
  visible,
  title,
  children,
  onClose,
}: AddEditPanelProps) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* Clicking this darkened area closes the panel */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={styles.panel}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: sizes.bannerHeight,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,

    alignItems: "center",
    justifyContent: "center",
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10, 40, 56, 0.35)",
  },

  panel: {
    width: "90%",
    maxWidth: 520,
    maxHeight: "85%",

    backgroundColor: colors.background,
    borderRadius: sizes.cardRadius,
    padding: scale(18),

    shadowColor: colors.accentContrast,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: scale(12),
  },

  title: {
    fontSize: scale(24),
    fontWeight: "800",
    color: colors.brand,
  },

  closeButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: colors.tileBackground,

    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    fontSize: scale(28),
    color: colors.accentContrast,
    lineHeight: scale(30),
  },

  content: {
    gap: scale(12),
    paddingBottom: scale(8),
  },
});