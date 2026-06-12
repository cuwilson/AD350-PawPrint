import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { colors } from "@/styles/colors";
import PawPrintBanner from "@/components/PawPrintBanner";
import MenuDropdown from "@/components/MenuDropdown";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AddEditPanel from "@/components/overlays/AddEditPanel";
import ReminderForm from "@/components/forms/ReminderForm";



type DashboardItem = {
  label: string;
};

export default function DashboardScreen() {
  const { ownerId, firstName } = useLocalSearchParams();
  const ownerIdValue = Array.isArray(ownerId) ? ownerId[0] : ownerId;
  const firstNameValue = Array.isArray(firstName) ? firstName[0] : firstName;
  const ownerIdNumber = ownerIdValue ? Number(ownerIdValue) : null;

  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [appointments, setAppointments] = useState<DashboardItem[]>([]);
  const [reminders, setReminders] = useState<DashboardItem[]>([]);

  const [activePanel, setActivePanel] = useState<"reminder" | "appointment" | "pet" | null>(null);

  useEffect(() => {
    async function getDashboardStats() {
      const { data, error } = await supabase
        .from("owner_dashboard_stats")
        .select("*")
        .eq("owner_id", ownerIdNumber)
        .single();

      if (error) {
        setMessage(error.message);
        return;
      }

      const { data: appointmentData } = await supabase
        .from("upcoming_appointments")
        .select("pet_name, appointment_title, appointment_date")
        .eq("owner_id", ownerIdNumber)
        .order("appointment_date");

      setAppointments(
        appointmentData?.map((item) => ({
          label: `${item.pet_name}: ${item.appointment_title}`,
        })) ?? []
      );

      const { data: reminderData } = await supabase
        .from("upcoming_reminders")
        .select("pet_name, reminder_title, due_date")
        .eq("owner_id", ownerIdNumber)
        .order("due_date");

      setReminders(
        reminderData?.map((item) => ({
          label: `${item.pet_name}: ${item.reminder_title}`,
        })) ?? []
      );
    }

    if (ownerIdNumber) {
      getDashboardStats();
    }
  }, [ownerIdNumber]);

  return (
    <View style={styles.screen}>
      <PawPrintBanner
        showMenu
        ownerId={ownerIdValue}
        firstName={firstNameValue}
        onMenuPress={() => setMenuOpen((current) => !current)}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome, {firstNameValue}</Text>
        <Text style={styles.subtitle}>PawPrint Dashboard</Text>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <DashboardSection
          title="Upcoming Events"
          items={appointments.map((item) => item.label)}
          onAddPress={() => setActivePanel("appointment")}
        />

        <DashboardSection
          title="Reminders"
          items={reminders.map((item) => item.label)}
          onAddPress={() => setActivePanel("reminder")}
        />
      </ScrollView>

      <AddEditPanel
        visible={activePanel === "reminder"}
        title="Add Reminder"
        onClose={() => setActivePanel(null)}
      >
        {ownerIdNumber ? (
          <ReminderForm
            ownerId={ownerIdNumber}
            onSuccess={() => {
              setActivePanel(null);
            }}
          />
        ) : null}
      </AddEditPanel>

      <AddEditPanel
        visible={activePanel === "appointment"}
        title="Add Appointment"
        onClose={() => setActivePanel(null)}
      >
        <Text>Appointment form will go here.</Text>
      </AddEditPanel>

      <AddEditPanel
        visible={activePanel === "pet"}
        title="Add Pet"
        onClose={() => setActivePanel(null)}
      >
        <Text>Pet form will go here.</Text>
      </AddEditPanel>

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