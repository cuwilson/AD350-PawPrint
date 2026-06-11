import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function HomeScreen() {
  useEffect(() => {
  async function testConnection() {
    const { data, error } = await supabase
      .from("owners")
      .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);
  }

  testConnection();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐾 PawPrint</Text>
      <Text style={styles.subtitle}>
        Track pets, reminders, appointments, and care records.
      </Text>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>Week 4: Supabase Connection</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Log in with an existing owner profile or create a new PawPrint user.
        </Text>

        <Link href="/login" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Returning User</Text>
          </Pressable>
        </Link>

        <Link href="/new-user" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>New User</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f9fc",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#336b87",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#0a2838",
    marginBottom: 20,
  },
  banner: {
    backgroundColor: "rgba(246, 79, 89, 0.15)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
    marginBottom: 18,
  },
  bannerText: {
    color: "#0a2838",
    fontWeight: "700",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "rgba(10, 40, 56, 0.10)",
    borderRadius: 22,
    padding: 24,
    gap: 14,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#336b87",
  },
  cardText: {
    fontSize: 15,
    color: "#0a2838",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#f64f59",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#f6f9fc",
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "#336b87",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#f6f9fc",
    fontWeight: "800",
  },
});