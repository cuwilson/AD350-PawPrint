import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TextInput, ScrollView, View } from "react-native";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import PawPrintLogo from "@/components/small-elements/PawPrintLogo";
import { globalStyles } from "@/styles/global";
import { sizes } from "@/styles/sizes";
import FormDropdown from "@/components/small-elements/FormDropdown";
import { isValidPassword } from "@/utils/password";

type SecurityQuestion = {
    security_question_id: number;
    question_text: string;
};

export default function NewUserScreen() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);
    const [securityQuestionId, setSecurityQuestionId] = useState<number | null>(null);
    const [securityAnswer, setSecurityAnswer] = useState("");


    useEffect(() => {
        async function loadSecurityQuestions() {
            const { data, error } = await supabase
                .from("security_questions")
                .select("security_question_id, question_text")
                .order("security_question_id");

            if (error) {
                setMessage(error.message);
                return;
            }

            setSecurityQuestions(data ?? []);
        }

        loadSecurityQuestions();
    }, []);


    async function createOwner() {
        if (!isValidPassword(password)) {
            setMessage(
                "Password must be at least 8 characters and contain a number."
            );
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (!securityQuestionId || !securityAnswer) {
            setMessage("Please select a security question and answer.");
            return;
        }

        const { data, error } = await supabase
            .from("owners")
            .insert({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone || null,
                password: password,
                security_question_id: securityQuestionId,
                security_answer: securityAnswer,
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
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={globalStyles.title}>Create Account</Text>
            <View style={styles.logoWrapper}>
                <PawPrintLogo size={150} />
            </View>
            <TextInput placeholder="First Name" style={globalStyles.input} value={firstName} onChangeText={setFirstName} />
            <TextInput placeholder="Last Name" style={globalStyles.input} value={lastName} onChangeText={setLastName} />
            <TextInput placeholder="Email" style={globalStyles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput placeholder="Phone" style={globalStyles.input} value={phone} onChangeText={setPhone} />

            <TextInput
                placeholder="Password"
                style={globalStyles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                placeholder="Confirm Password"
                style={globalStyles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <FormDropdown
                label="Security Question"
                selectedValue={securityQuestionId}
                placeholder="Choose a security question"
                options={securityQuestions.map((question) => ({
                    label: question.question_text,
                    value: question.security_question_id,
                }))}
                onValueChange={(value) =>
                    setSecurityQuestionId(Number(value))
                }
            />

            <TextInput
                placeholder="Security Answer"
                style={globalStyles.input}
                value={securityAnswer}
                onChangeText={setSecurityAnswer}
                autoCapitalize="none"
            />

            <Pressable style={globalStyles.accentButton} onPress={createOwner}>
                <Text style={globalStyles.accentButtonText}>Create Account</Text>
            </Pressable>

            {message ? <Text style={globalStyles.message}>{message}</Text> : null}
            <Link href="/" asChild>
                <Pressable style={globalStyles.backButton}>
                    <Text>← Back</Text>
                </Pressable>
            </Link>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.screen.backgroundColor,
        padding: sizes.screenPadding,
        gap: 12,
        paddingTop: 40,
        paddingBottom: 40,
    },

    logoWrapper: {
        alignItems: "center",
        marginBottom: 12,
    },
});