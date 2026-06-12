import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import PawPrintLogo from "./PawPrintLogo";
import IconButton from "./IconButton";
import { colors } from "@/styles/colors";

const backIcon = require("@/assets/images/back-button.png");
const menuIcon = require("@/assets/images/menu.png");

type PawPrintBannerProps = {
  showBack?: boolean;
  showMenu?: boolean;
};

export default function PawPrintBanner({
  showBack = false,
  showMenu = false,
}: PawPrintBannerProps) {
  return (
    <View style={styles.banner}>
      {showMenu ? (
        <View style={styles.leftIcon}>
          <IconButton
            source={menuIcon}
            onPress={() => console.log("Menu pressed")}
            size={32}
          />
        </View>
      ) : null}

      <PawPrintLogo size={61} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 120,
    width: "100%",
    backgroundColor: colors.bannerBackground,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 14,
  },
  leftIcon: {
    position: "absolute",
    left: 24,
    bottom: 20,
  },
  rightIcon: {
    position: "absolute",
    right: 24,
    bottom: 20,
  },
});