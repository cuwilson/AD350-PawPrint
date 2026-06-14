import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import PawPrintLogo from "./small-elements/PawPrintLogo";
import IconButton from "./small-elements/IconButton";
import { colors } from "@/styles/colors";
import { sizes } from "@/styles/sizes";
import { useState } from "react";
import MenuDropdown from "@/components/overlays/MenuDropdown";

const menuIcon = require("@/assets/images/menu.png");

type PawPrintBannerProps = {
  showMenu?: boolean;
  onMenuPress?: () => void;
  ownerId?: string | string[];
  firstName?: string | string[];
};

export default function PawPrintBanner({
  showMenu = true,
  onMenuPress,
  ownerId,
  firstName,
}: PawPrintBannerProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ownerIdValue = Array.isArray(ownerId) ? ownerId[0] : ownerId;
  const firstNameValue = Array.isArray(firstName) ? firstName[0] : firstName;

  function goToDashboard() {
    router.push({
      pathname: "/dashboard",
      params: {
        ownerId: ownerIdValue,
        firstName: firstNameValue,
      },
    });
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.banner}>
        {showMenu ? (
          <View style={styles.leftIcon}>
            <IconButton
              source={menuIcon}
              onPress={() => setMenuOpen((current) => !current)}
              size={sizes.iconMedium}
            />
          </View>
        ) : null}

        <Pressable onPress={goToDashboard}>
          <PawPrintLogo size={sizes.logoMedium} />
        </Pressable>
      </View>

      <MenuDropdown
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        ownerId={ownerIdValue}
        firstName={firstNameValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 50,
  },

  banner: {
    height: sizes.bannerHeight,
    width: "100%",
    backgroundColor: colors.bannerBackground,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: sizes.bannerPaddingBottom,
  },

  leftIcon: {
    position: "absolute",
    left: sizes.screenPadding,
    bottom: sizes.bannerIconBottom,
  },
});