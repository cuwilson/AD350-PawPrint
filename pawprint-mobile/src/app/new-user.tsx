import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import PawPrintLogo from "@/components/small-elements/PawPrintLogo";
import { globalStyles } from "@/styles/global";


export default function NewUserScreen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    async function createOwner() {
        const { data, error } = await supabase
            .from("owners")
            .insert({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
            })
            .select()
            .single();

        if (error) {
            setMessage(error.message);
            return;
        }

        setMessage(`Account created for ${data.first_name}!`);
        console.log("New owner:", data);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <PawPrintLogo size={150} />
            <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
            <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} />

            <Pressable style={styles.button} onPress={createOwner}>
                <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>

            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Link href="/" asChild>
                <Pressable style={globalStyles.backButton}>
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
        gap: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#336b87",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        backgroundColor: "rgba(51,107,135,0.1)",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#f64f59",
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
    backButton: {
        marginTop: 20,
        alignItems: "center",
    },
});