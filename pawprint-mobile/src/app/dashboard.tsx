import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { globalStyles } from "@/styles/global";
import { colors } from "@/styles/colors";
import PawPrintBanner from "@/components/PawPrintBanner";
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

type Pet = {
  pet_id: number;
  name: string;
  species: string;
  breed: string | null;
  photo_url: string | null;
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

  const [pets, setPets] = useState<Pet[]>([]);

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

    const { data: petData } = await supabase
      .from("pets")
      .select("pet_id, name, species, breed, photo_url")
      .eq("owner_id", ownerIdNumber)
      .order("name");

    setPets(petData ?? []);
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
        style={globalStyles.dashboardBulletRow}
        onPress={() => {
          setSelectedItem(item);
          setActivePanel(panelType);
        }}
      >
        <Text style={globalStyles.bullet}>•</Text>

        <View style={styles.itemContent}>
          <View style={globalStyles.itemText}>
            <Text style={globalStyles.cardText}>{item.label}</Text>

            {item.date ? (
              <Text style={globalStyles.dashboardItemDate}>{item.date}</Text>
            ) : null}
          </View>

          {isReminder ? (
            <Pressable
              style={globalStyles.completeButton}
              onPress={() => completeReminder(item.id)}
            >
              <Text style={globalStyles.smallButtonText}>Done</Text>
            </Pressable>
          ) : null}
        </View>
      </Pressable>
    );
  }

  return (
    <View style={globalStyles.screen}>
      <PawPrintBanner
        showMenu
        ownerId={ownerIdValue}
        firstName={firstNameValue}
        onMenuPress={() => setMenuOpen((current) => !current)}
      />

      <ScrollView contentContainerStyle={globalStyles.content}>
        <Text style={globalStyles.title}>Welcome, {firstNameValue}</Text>
        <Text style={globalStyles.subtitle}>PawPrint Dashboard</Text>

        {message ? <Text style={globalStyles.message}>{message}</Text> : null}

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

        <Text style={styles.sectionTitle}>My Animals</Text>

        <View style={styles.petGrid}>
          {pets.map((pet) => (
            <Pressable
              key={pet.pet_id}
              style={styles.petTile}
              onPress={() =>
                router.push({
                  pathname: "/pet-dashboard",
                  params: {
                    ownerId: ownerIdValue,
                    firstName: firstNameValue,
                    petId: pet.pet_id,
                  },
                })
              }
            >
              <View style={styles.photoContainer}>
                <Image
                  source={
                    pet.photo_url
                      ? { uri: pet.photo_url }
                      : require("@/assets/images/pet-placeholder.png")
                  }
                  style={styles.petPhoto}
                />
              </View>

              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.name}</Text>

                <Text style={styles.petDetail}>
                  • {pet.species}
                </Text>

                {pet.breed ? (
                  <Text style={styles.petDetail}>
                    • {pet.breed}
                  </Text>
                ) : null}

                <Text style={styles.petDetail}>
                  • No alerts
                </Text>
              </View>
            </Pressable>
          ))}

          {/* add pet tile */}
          <Pressable
            style={[styles.petTile, styles.addPetTile]}
            onPress={() => setActivePanel("pet")}
          >
            <View style={styles.photoContainer}>
              <Image
                source={require("@/assets/images/pet-placeholder.png")}
                style={styles.petPhoto}
              />
            </View>

            <View style={styles.petInfo}>
              <Text style={styles.addPetName}>Add Pet</Text>

              <Text style={styles.petDetail}>
                • Create a new profile
              </Text>

              <Text style={styles.petDetail}>
                • Upload a photo
              </Text>

              <Text style={styles.petDetail}>
                • Add reminders
              </Text>
            </View>
          </Pressable>

        </View>
      </ScrollView>

      <AddEditPanel
        visible={activePanel === "reminderDetails"}
        title="Reminder Details"
        onClose={() => setActivePanel(null)}
      >
        {selectedItem ? (
          <>
            <Text style={globalStyles.cardHeaderText}>{selectedItem.petName}</Text>
            <Text style={globalStyles.cardText}>{selectedItem.title}</Text>

            {selectedItem.date ? (
              <Text style={globalStyles.cardText}>Due: {selectedItem.date}</Text>
            ) : null}

            <Pressable
              style={globalStyles.brandButton}
              onPress={() => setActivePanel("reminder")}
            >
              <Text style={globalStyles.smallButtonText}>Edit</Text>
            </Pressable>

            <Pressable
              style={globalStyles.brandButton}
              onPress={() => completeReminder(selectedItem.id)}
            >
              <Text style={globalStyles.smallButtonText}>Complete</Text>
            </Pressable>

            <Pressable
              style={globalStyles.deleteButton}
              onPress={() => deleteReminder(selectedItem.id)}
            >
              <Text style={globalStyles.deleteButtonText}>Delete</Text>
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


    </View>
  );
}

const styles = StyleSheet.create({


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


  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },


  completeDetailsButton: {
    backgroundColor: colors.brand,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },



  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.brand,
    marginBottom: 12,
  },

  petGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
    justifyContent: "center",
  },

  addPetTile: {
    borderColor: colors.accent,
    backgroundColor: colors.bannerBackground,
    color: colors.accentContrast,
  },


  petName: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.brand,
    marginBottom: 8,
  },

  addPetName: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.accentContrast,
    marginBottom: 8,
  },

  petDetail: {
    color: colors.accentContrast,
  },
  photoContainer: {
    width: 140,
    backgroundColor: colors.tileBackground,
    borderRightWidth: 4,
    borderRightColor: colors.brand,
    justifyContent: "center",
    alignItems: "center",
  },

  petPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  petInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-evenly",
  },

  petTile: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderWidth: 4,
    borderColor: colors.brand,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 16,
    minHeight: 180,
  },
});