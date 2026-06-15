import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, Link } from "expo-router";
import { supabase } from "@/lib/supabase";
import { globalStyles } from "@/styles/global";
import { colors } from "@/styles/colors";
import PawPrintLogo from "@/components/small-elements/PawPrintLogo";
import { sizes } from "@/styles/sizes";
import { isValidPassword } from "@/utils/password";




export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [ownerId, setOwnerId] = useState<number | null>(null);
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [answerVerified, setAnswerVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    async function findAccount() {
        const { data, error } = await supabase
            .from("owners")
            .select(
                `
            owner_id,
            security_question_id,
            security_questions (
                question_text
            )
            `
            )
            .eq("email", email.trim().toLowerCase())
            .single();

        console.log("ACCOUNT:", data);
        console.log("ERROR:", error);

        if (error || !data) {
            setMessage("No account found with that email.");
            return;
        }

        setOwnerId(data.owner_id);
        setSecurityQuestion(
            (data.security_questions as any).question_text
        );

        console.log(
            "QUESTION TYPE:",
            Array.isArray(data.security_questions)
        );
        setMessage("");
    }



    async function verifyAnswer() {
        const { data, error } = await supabase
            .from("owners")
            .select("security_answer")
            .eq("owner_id", ownerId)
            .single();

        if (error || !data) {
            setMessage("Unable to verify account.");
            return;
        }

        if (
            data.security_answer.toLowerCase().trim() !==
            securityAnswer.toLowerCase().trim()
        ) {
            setMessage("Incorrect security answer.");
            return;
        }

        setAnswerVerified(true);
        setMessage("");
    }

    async function resetPassword() {
        if (!isValidPassword(newPassword)) {
            setMessage(
                "Password must be at least 8 characters and contain a number."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const { error } = await supabase
            .from("owners")
            .update({
                password: newPassword,
            })
            .eq("owner_id", ownerId);

        if (error) {
            setMessage(error.message);
            return;
        }

        setMessage("Password successfully updated.");

        setTimeout(() => {
            router.replace("/login");
        }, 1500);
    }


    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <PawPrintLogo size={263} />
            </View>

            <TextInput
                placeholder="Email"
                style={globalStyles.loginInput}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            {securityQuestion ? (
                <>
                    <View style={styles.questionBox}>
                        <Text style={styles.questionLabel}>
                            Security Question
                        </Text>

                        <Text style={styles.questionText}>
                            {securityQuestion}
                        </Text>
                    </View>

                    <TextInput
                        placeholder="Security Answer"
                        style={globalStyles.loginInput}
                        value={securityAnswer}
                        onChangeText={setSecurityAnswer}
                        autoCapitalize="none"
                    />
                </>
            ) : null}


            {answerVerified ? (
                <>
                    <TextInput
                        placeholder="New Password"
                        style={globalStyles.loginInput}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />

                    <TextInput
                        placeholder="Confirm Password"
                        style={globalStyles.loginInput}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                    />
                </>
            ) : null}

            <Pressable
                style={globalStyles.smallButton}
                onPress={
                    answerVerified
                        ? resetPassword
                        : securityQuestion
                            ? verifyAnswer
                            : findAccount
                }
            >
                <Text style={globalStyles.smallButtonText}>
                    {answerVerified
                        ? "Reset Password"
                        : securityQuestion
                            ? "Verify Answer"
                            : "Continue"}
                </Text>
            </Pressable>



            {message ? (
                <Text style={globalStyles.message}>
                    {message}
                </Text>
            ) : null}

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
        backgroundColor: colors.background,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
    },

    logoBox: {
        width: 263,
        height: 263,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
    },
    questionBox: {
        backgroundColor: colors.bannerBackground,
        borderRadius: sizes.cardRadius,
        padding: 16,
        borderWidth: 2,
        borderColor: colors.accent,
        marginVertical: 8,
    },

    questionLabel: {
        color: colors.accentContrast,
        fontSize: sizes.body,
        fontWeight: "700",
        marginBottom: 8,
    },

    questionText: {
        color: colors.accentContrast,
        fontSize: sizes.body,
        fontWeight: "600",
    },

});