import { Image, StyleSheet } from "react-native";
import { sizes } from "@/styles/sizes";

type PawPrintLogoProps = {
  size?: number;
};

export default function PawPrintLogo({
  size = sizes.logoLarge,
}: PawPrintLogoProps) {
  return (
    <Image
      source={require("@/assets/images/logo.png")}
      style={[
        styles.logo,
        {
          width: size,
          height: size,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
  },
});