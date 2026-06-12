import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import PawPrintLogo from "./PawPrintLogo";
import IconButton from "./IconButton";
import { colors } from "@/styles/colors";
import { sizes } from "@/styles/sizes";

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
  function goToDashboard() {
    router.push({
      pathname: "/dashboard",
      params: {
        ownerId,
        firstName,
      },
    });
  }

  return (
    <View style={styles.banner}>
      {showMenu ? (
        <View style={styles.leftIcon}>
          <IconButton
            source={menuIcon}
            onPress={onMenuPress ?? (() => {})}
            size={sizes.iconMedium}
          />
        </View>
      ) : null}

      <Pressable onPress={goToDashboard}>
        <PawPrintLogo size={sizes.logoMedium} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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