import { StyleSheet, View } from "react-native";
import SectionHeader from "@/components/small-elements/SectionHeader";
import BulletArea from "@/components/small-elements/BulletArea";
import FloatingAddButton from "@/components/small-elements/FloatingAddButton";
import { scale } from "@/styles/sizes";
import { ReactNode } from "react";
import { colors } from "@/styles/colors";

type DashboardSectionProps = {
    title: string;
    items?: string[];
    onAddPress: () => void;
    children?: ReactNode;
};

export default function DashboardSection({
    title,
    items,
    onAddPress,
    children
}: DashboardSectionProps) {
    return (
        <View style={styles.container}>
            <SectionHeader title={title} />

            <View style={styles.body}>
                {children ? (
                    <View style={styles.listContainer}>{children}</View>
                ) : (
                    <BulletArea items={items ?? []} />
                )}

                {/* Positioned over the lower-right corner of the bullet area */}
                <View style={styles.addButtonWrapper}>
                    <FloatingAddButton onPress={onAddPress} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: scale(10),
    },

    body: {
        position: "relative",
        marginBottom: scale(32), // Extra space to accommodate the floating button
    },

    addButtonWrapper: {
        position: "absolute",
        right: scale(12),
        bottom: scale(-18),
    },
    listContainer: {
        backgroundColor: "rgba(10, 40, 56, 0.10)",
        borderRadius: 18,
        padding: 18,
        gap: 8,
        shadowColor: colors.brand,
        shadowOffset: {
            width: 2,
            height: 8,
        },
        shadowOpacity: 0.45,
        shadowRadius: 8,
    },
});