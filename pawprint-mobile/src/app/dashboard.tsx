import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { globalStyles } from "@/styles/global";
import { colors } from "@/styles/colors";
import PawPrintBanner from "@/components/PawPrintBanner";


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
      <PawPrintBanner showMenu />

      {/* dashboard content */}
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

  backIcon: {
    fontSize: 42,
    color: colors.brand,
    fontWeight: "700",
  },
});