import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import PawPrintBanner from "@/components/PawPrintBanner";
import MenuDropdown from "@/components/overlays/MenuDropdown";
import { colors } from "@/styles/colors";
import { sizes } from "@/styles/sizes";
import { useState } from "react";

export default function UnderConstructionScreen() {
    const { ownerId, firstName, pageTitle } = useLocalSearchParams();
    const [menuOpen, setMenuOpen] = useState(false);
    const ownerIdValue = Array.isArray(ownerId) ? ownerId[0] : ownerId;
    const firstNameValue = Array.isArray(firstName) ? firstName[0] : firstName;

    return (
        <View style={styles.screen}>
            <PawPrintBanner
                showMenu
                ownerId={ownerIdValue}
                firstName={firstNameValue}
                onMenuPress={() => setMenuOpen((current) => !current)}
            />

            <View style={styles.content}>
                <Text style={styles.title}>{pageTitle}</Text>
                <Text style={styles.message}>This page is under construction.</Text>
            </View>

            <MenuDropdown
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                ownerId={ownerIdValue}
                firstName={firstNameValue}
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
        flex: 1,
        padding: sizes.screenPadding,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: sizes.title,
        fontWeight: "800",
        color: colors.brand,
        marginBottom: 12,
        textAlign: "center",
    },

    message: {
        fontSize: sizes.body,
        color: colors.accentContrast,
        textAlign: "center",
    },
});