import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { sizes } from "./sizes";


export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: sizes.screenPadding,
  },

  centeredScreen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: sizes.screenPadding,
    justifyContent: "center",
  },

  title: {
    fontSize: sizes.title,
    fontWeight: "800",
    color: colors.brand,
    textAlign: "center",
  },

  subtitle: {
    fontSize: sizes.subtitle,
    color: colors.accentContrast,
    textAlign: "center",
  },

  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: sizes.body,
  },

  accentButton: {
    backgroundColor: colors.accent,
    height: sizes.buttonHeight,
    borderRadius: sizes.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: colors.tileBackground,
    borderRadius: sizes.cardRadius,
    padding: sizes.screenPadding,
    gap: 14,
  },

  message: {
    color: colors.accentContrast,
    textAlign: "center",
    marginTop: 12,
  },

  backButton: {
    marginTop: 20,
    alignItems: "center",
  },

  loginInput: {
    width: "100%",
    maxWidth: 379,
    height: sizes.buttonHeight,
    backgroundColor: colors.inputBackground,
    borderRadius: sizes.borderRadius,
    paddingHorizontal: 16,
    fontSize: sizes.body,

    shadowColor: "#9c7f85",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  smallButton: {
    width: 160,
    height: sizes.buttonSmallHeight,
    backgroundColor: colors.brand,
    borderRadius: sizes.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },

  smallButtonText: {
    color: colors.white,
    fontSize: sizes.body,
    fontWeight: "400",
  },

  bigButton: {
    width: "100%",
    maxWidth: 344,
    height: sizes.buttonHeight,
    backgroundColor: colors.brand,
    borderRadius: sizes.borderRadius,
    alignItems: "center",
    justifyContent: "center",
  },

  bigButtonText: {
    color: colors.white,
    fontSize: sizes.title,
    fontWeight: "700",
  },

  completeButton: {
    width: 46,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
  },

  accentButtonText: {
    color: colors.accentContrast,
    fontSize: sizes.body,
    fontWeight: "700",
  },

  banner: {
    height: sizes.bannerHeight,
    width: "100%",
    backgroundColor: colors.bannerBackground,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: sizes.bannerPaddingBottom,
  },

  bannerLogo: {
    width: sizes.logoWidth,
    height: sizes.logoHeight,
    resizeMode: "contain",
  },

  bannerBackButton: {
    position: "absolute",
    left: sizes.iconOffset,
    bottom: 25,
  },
});