import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { colors } from "@/styles/colors";
import PawPrintBanner from "@/components/PawPrintBanner";
import MenuDropdown from "@/components/MenuDropdown";

type DashboardStats = {
  owner_id: number;
  first_name: string;
  last_name: string;
  total_pets: number;
  upcoming_reminders: number;
  overdue_reminders: number;
  upcoming_appointments: number;
  current_foods: number;
  latest_care_record_date: string | null;
};

export default function DashboardScreen() {
  const { ownerId, firstName } = useLocalSearchParams();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function getDashboardStats() {
      const { data, error } = await supabase
        .from("owner_dashboard_stats")
        .select("*")
        .eq("owner_id", ownerId)
        .single();

      if (error) {
        setMessage(error.message);
        return;
      }

      setStats(data);
    }

    if (ownerId) {
      getDashboardStats();
    }
  }, [ownerId]);

  return (
    <View style={styles.screen}>
      <PawPrintBanner
        showMenu
        ownerId={ownerId}
        firstName={firstName}
        onMenuPress={() => setMenuOpen((current) => !current)}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome, {firstName}</Text>
        <Text style={styles.subtitle}>PawPrint Dashboard</Text>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        {stats ? (
          <View style={styles.card}>
            <Text style={styles.cardText}>Pets: {stats.total_pets}</Text>
            <Text style={styles.cardText}>
              Upcoming Reminders: {stats.upcoming_reminders}
            </Text>
            <Text style={styles.cardText}>
              Overdue Reminders: {stats.overdue_reminders}
            </Text>
            <Text style={styles.cardText}>
              Upcoming Appointments: {stats.upcoming_appointments}
            </Text>
            <Text style={styles.cardText}>
              Current Foods: {stats.current_foods}
            </Text>
          </View>
        ) : null}
      </ScrollView>

      <MenuDropdown
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.brand,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.accentContrast,
    marginBottom: 20,
  },
  message: {
    color: colors.accent,
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(10, 40, 56, 0.10)",
    borderRadius: 18,
    padding: 18,
    gap: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.accentContrast,
    fontWeight: "600",
  },
});