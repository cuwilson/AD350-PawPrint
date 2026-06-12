import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "@/styles/colors";
import { sizes } from "@/styles/sizes";

type MenuDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  "Make an Appointment",
  "Medications",
  "Medical Records",
  "Finding a Vet",
  "Emergency Care Locator",
  "Vaccinations",
  "View all Animals",
  "Settings",
  "Log Off",
];

export default function MenuDropdown({ isOpen, onClose }: MenuDropdownProps) {
  if (!isOpen) return null;

  function handleMenuPress(item: string) {
    if (item === "Log Off") {
      onClose();

      router.replace("/login");
      return;
    }

    console.log(`${item} pressed`);
  }

  return (
    <View style={styles.menuWrapper}>
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
              style={[
                styles.menuButton,
                isLogOff && styles.logOffButton,
              ]}
            >
              <Text style={styles.menuButtonText}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  menuWrapper: {
    position: "absolute",
    top: sizes.bannerHeight,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
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