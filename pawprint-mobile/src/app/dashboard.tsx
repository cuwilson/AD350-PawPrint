import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
  const { firstName } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {firstName}
      </Text>

      <Text style={styles.subtitle}>
        PawPrint Dashboard
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f9fc",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#336b87",
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
    color: "#0a2838",
  },
});