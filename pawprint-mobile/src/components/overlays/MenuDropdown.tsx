import { router } from "expo-router";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { sizes } from "@/styles/sizes";

type MenuDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  ownerId?: string;
  firstName?: string;
};

const menuRoutes = {
  //"Make an Appointment": "/under-construction",
  Medications: "/under-construction",
  "Medical Records": "/under-construction",
  //"Finding a Vet": "/under-construction",
  //"Emergency Care Locator": "/under-construction",
  Vaccinations: "/under-construction",
  "View all Animals": "/animals",
  Settings: "/under-construction",
} as const;

type MenuItem = keyof typeof menuRoutes | "Log Off";

const menuItems: MenuItem[] = [
  //"Make an Appointment",
  "Medications",
  "Medical Records",
  //"Finding a Vet",
  //"Emergency Care Locator",
  "Vaccinations",
  "View all Animals",
  "Settings",
  "Log Off",
];

export default function MenuDropdown({
  isOpen,
  onClose,
  ownerId,
  firstName,
}: MenuDropdownProps) {
  if (!isOpen) return null;

  function handleMenuPress(item: MenuItem) {
    onClose();

    if (item === "Log Off") {
      router.replace("/login");
      return;
    }

    router.push({
      pathname: menuRoutes[item],
      params: {
        ownerId,
        firstName,
        pageTitle: item,
      },
    });
  }

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        <Pressable style={styles.bannerSpacer} onPress={onClose} />

        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.menuArea}>
            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.menuContainer}
              showsVerticalScrollIndicator={false}
            >
              {menuItems.map((item) => {
                const isLogOff = item === "Log Off";

                return (
                  <Pressable
                    key={item}
                    onPress={() => handleMenuPress(item)}
                    style={[styles.menuButton, isLogOff && styles.logOffButton]}
                  >
                    <Text style={styles.menuButtonText}>{item}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },

  bannerSpacer: {
    height: sizes.bannerHeight,
    backgroundColor: "transparent",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },

  menuArea: {
    flex: 1,
  },

  scrollArea: {
    flex: 1,
  },

  menuContainer: {
    paddingTop: sizes.menuPaddingTop,
    paddingHorizontal: sizes.menuPaddingHorizontal,
    paddingBottom: sizes.menuPaddingBottom,
    gap: sizes.menuGap,
  },

  menuButton: {
    height: sizes.menuButtonHeight,
    backgroundColor: colors.brand,
    borderRadius: sizes.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  logOffButton: {
    backgroundColor: colors.accent,
  },

  menuButtonText: {
    color: colors.background,
    fontSize: sizes.menuText,
    fontWeight: "600",
    textAlign: "center",
  },
});