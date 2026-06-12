import { Image, StyleSheet } from "react-native";

type PawPrintLogoProps = {
  size?: number;
};

export default function PawPrintLogo({
  size = 200,
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