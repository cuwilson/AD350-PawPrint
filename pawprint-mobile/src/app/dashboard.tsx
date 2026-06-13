import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { colors } from "@/styles/colors";
import PawPrintBanner from "@/components/PawPrintBanner";
import MenuDropdown from "@/components/MenuDropdown";
import DashboardSection from "@/components/dashboard/DashboardSection";
import AddEditPanel from "@/components/overlays/AddEditPanel";
import ReminderForm from "@/components/forms/ReminderForm";

type DashboardItem = {
  id: number;
  petName: string;
  title: string;
  date?: string | null;
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
  const [selectedItem, setSelectedItem] = useState<DashboardItem | null>(null);

  const [activePanel, setActivePanel] = useState<
    | "reminder"
    | "appointment"
    | "pet"
    | "reminderDetails"
    | "appointmentDetails"
    | null
  >(null);

  async function loadDashboardData() {
    if (!ownerIdNumber) return;

    const { error } = await supabase
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
      .select("appointment_id, pet_name, appointment_title, appointment_date")
      .eq("owner_id", ownerIdNumber)
      .order("appointment_date");

    setAppointments(
      appointmentData?.map((item) => ({
        id: item.appointment_id,
        petName: item.pet_name,
        title: item.appointment_title,
        date: item.appointment_date,
        label: `${item.pet_name}: ${item.appointment_title}`,
      })) ?? []
    );

    const { data: reminderData } = await supabase
      .from("upcoming_reminders")
      .select("reminder_id, pet_name, reminder_title, due_date")
      .eq("owner_id", ownerIdNumber)
      .order("due_date");

    setReminders(
      reminderData?.map((item) => ({
        id: item.reminder_id,
        petName: item.pet_name,
        title: item.reminder_title,
        date: item.due_date,
        label: `${item.pet_name}: ${item.reminder_title}`,
      })) ?? []
    );
  }

  useEffect(() => {
    loadDashboardData();
  }, [ownerIdNumber]);

  async function completeReminder(reminderId: number) {
    const { error } = await supabase
      .from("reminders")
      .update({ is_completed: true })
      .eq("reminder_id", reminderId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setActivePanel(null);
    loadDashboardData();
  }

  async function deleteReminder(reminderId: number) {
    const { error } = await supabase
      .from("reminders")
      .delete()
      .eq("reminder_id", reminderId);

    if (error) {
      setMessage(error.message);
      return;
    }

    setActivePanel(null);
    loadDashboardData();
  }

  function renderDashboardItem(
    item: DashboardItem,
    panelType: "appointmentDetails" | "reminderDetails"
  ) {
    const isReminder = panelType === "reminderDetails";

    return (
      <Pressable
        key={item.id}
        style={styles.dashboardBulletRow}
        onPress={() => {
          setSelectedItem(item);
          setActivePanel(panelType);
        }}
      >
        <Text style={styles.bullet}>•</Text>

        <View style={styles.itemContent}>
          <View style={styles.itemText}>
            <Text style={styles.cardText}>{item.label}</Text>

            {item.date ? (
              <Text style={styles.dashboardItemDate}>{item.date}</Text>
            ) : null}
          </View>

          {isReminder ? (
            <Pressable
              style={styles.completeButton}
              onPress={() => completeReminder(item.id)}
            >
              <Text style={styles.smallButtonText}>Done</Text>
            </Pressable>
          ) : null}
        </View>
      </Pressable>
    );
  }

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
          onAddPress={() => setActivePanel("appointment")}
        >
          {appointments.map((item) =>
            renderDashboardItem(item, "appointmentDetails")
          )}
        </DashboardSection>

        <DashboardSection
          title="Reminders"
          onAddPress={() => setActivePanel("reminder")}
        >
          {reminders.map((item) =>
            renderDashboardItem(item, "reminderDetails")
          )}
        </DashboardSection>
      </ScrollView>

      <AddEditPanel
        visible={activePanel === "reminderDetails"}
        title="Reminder Details"
        onClose={() => setActivePanel(null)}
      >
        {selectedItem ? (
          <>
            <Text style={styles.cardText}>{selectedItem.petName}</Text>
            <Text style={styles.cardText}>{selectedItem.title}</Text>

            {selectedItem.date ? (
              <Text style={styles.cardText}>Due: {selectedItem.date}</Text>
            ) : null}

            <Pressable
              style={styles.editButton}
              onPress={() => setActivePanel("reminder")}
            >
              <Text style={styles.smallButtonText}>Edit</Text>
            </Pressable>

            <Pressable
              style={styles.completeDetailsButton}
              onPress={() => completeReminder(selectedItem.id)}
            >
              <Text style={styles.smallButtonText}>Complete</Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteReminder(selectedItem.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </>
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
        visible={activePanel === "reminder"}
        title="Add Reminder"
        onClose={() => setActivePanel(null)}
      >
        {ownerIdNumber ? (
          <ReminderForm
            ownerId={ownerIdNumber}
            onSuccess={() => {
              setActivePanel(null);
              loadDashboardData();
            }}
          />
        ) : null}
      </AddEditPanel>

      <AddEditPanel
        visible={activePanel === "pet"}
        title="Add Pet"
        onClose={() => setActivePanel(null)}
      >
        <Text>Pet form will go here.</Text>
      </AddEditPanel>

      <MenuDropdown isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
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

  cardText: {
    fontSize: 16,
    color: colors.accentContrast,
    fontWeight: "600",
  },

  dashboardBulletRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  bullet: {
    fontSize: 32,
    color: colors.accent,
    top: -1,
  },

  itemContent: {
  flexDirection: "row",
  alignItems: "center",
},

  itemText: {
  marginRight: 12,
},

  dashboardItemDate: {
    fontSize: 14,
    color: colors.brand,
    marginTop: 2,
    fontWeight: "600",
  },

  completeButton: {
    width: 46,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    backgroundColor: colors.brand,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  completeDetailsButton: {
    backgroundColor: colors.brand,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  smallButtonText: {
    color: colors.background,
    fontWeight: "700",
  },

  deleteButtonText: {
    color: colors.accentContrast,
    fontWeight: "700",
  },
});