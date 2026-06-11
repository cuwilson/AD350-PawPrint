import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, Link } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function findOwner() {
        const { data, error } = await supabase
            .from("owners")
            .select("*")
            .eq("email", email)
            .single();

        if (error) {
  setMessage("No account found with that email.");
  return;
}

router.push({
  pathname: "/dashboard",
  params: {
    ownerId: data.owner_id,
    firstName: data.first_name,
  },
});
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Returning User</Text>

            <Text style={styles.label}>Email</Text>

            <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <Pressable style={styles.button} onPress={findOwner}>
                <Text style={styles.buttonText}>Find My Account</Text>
            </Pressable>

            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Link href="/" asChild>
                <Pressable style={styles.backButton}>
                    <Text>← Back</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f6f9fc",
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#336b87",
        marginBottom: 24,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        color: "#0a2838",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "rgba(51,107,135,0.1)",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
    },
    backButton: {
        marginTop: 20,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#336b87",
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#f6f9fc",
        fontWeight: "800",
    },
    message: {
        textAlign: "center",
        color: "#0a2838",
        marginTop: 12,
    },
});