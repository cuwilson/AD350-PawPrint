import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
    },

    centeredScreen: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
        justifyContent: "center",
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: colors.brand,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
    },

    input: {
        backgroundColor: colors.inputBackground,
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },

    accentButton: {
        backgroundColor: colors.accent,
        height: 64,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        backgroundColor: colors.tileBackground,
        borderRadius: 22,
        padding: 24,
        gap: 14,
    },

    message: {
        color: colors.text,
        textAlign: "center",
        marginTop: 12,
    },

    backButton: {
        marginTop: 20,
        alignItems: "center",
    },
    loginInput: {
        width: "100%",
        maxWidth: 379,
        height: 64,
        backgroundColor: colors.inputBackground,
        borderRadius: 4,
        paddingHorizontal: 16,
        fontSize: 16,

        shadowColor: "#9c7f85",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    smallButton: {
        width: 160,
        height: 32,
        backgroundColor: colors.brand,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },

    smallButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "400",
    },

    bigButton: {
        width: "100%",
        maxWidth: 344,
        height: 64,
        backgroundColor: colors.brand,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },

    bigButtonText: {
        color: colors.white,
        fontSize: 32,
        fontWeight: "700",
    },
    banner: {
        height: 120,
        width: "100%",
        backgroundColor: colors.bannerBackground,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 14,
    },

    bannerLogo: {
        width: 69,
        height: 61,
        resizeMode: "contain",
    },

    bannerBackButton: {
        position: "absolute",
        left: 32,
        bottom: 25,
    },
});