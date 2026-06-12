import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const guidelineWidth = 402; // Figma width

export function scale(size: number) {
  const scaled = size * (width / guidelineWidth);

  return Math.min(
    Math.max(scaled, size * 0.9),
    size * 1.15
  );
}

export const sizes = {
  bannerHeight: 112,

  logoWidth: scale(69),
  logoHeight: scale(61),
  logoSmall: scale(40),
  logoMedium: scale(61),
  logoLarge: scale(200),

  title: scale(32),
  subtitle: scale(16),
  body: scale(16),
  menuText: scale(24),

  buttonSmallHeight: scale(32),
  buttonHeight: scale(64),

  borderRadius: 4,
  cardRadius: 22,

  screenPadding: scale(24),

  iconOffset: scale(32),
  iconSmall: scale(24),
  iconMedium: scale(32),
  iconLarge: scale(40),
  iconPadding: scale(8),
  bannerIconBottom: scale(20),

  bannerPaddingBottom: scale(14),

  menuButtonWidth: scale(352),
  loginInputWidth: scale(379),
  bigButtonWidth: scale(344),

  menuPaddingTop: scale(16),
  menuPaddingHorizontal: scale(25),
  menuPaddingBottom: scale(32),
  menuGap: scale(12),
  menuButtonHeight: scale(56),
};