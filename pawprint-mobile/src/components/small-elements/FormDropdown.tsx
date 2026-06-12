import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@/styles/colors";
import { scale } from "@/styles/sizes";

type DropdownOption = {
    label: string;
    value: number | string;
};

type FormDropdownProps = {
    label: string;
    selectedValue: number | string | null;
    placeholder: string;
    options: DropdownOption[];
    onValueChange: (value: number | string | null) => void;
};

export default function FormDropdown({
    label,
    selectedValue,
    placeholder,
    options,
    onValueChange,
}: FormDropdownProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedValue ?? ""}
                    onValueChange={(value) => {
                        onValueChange(value === "" ? null : value);
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label={placeholder} value="" />

                    {options.map((option) => (
                        <Picker.Item
                            key={String(option.value)}
                            label={option.label}
                            value={String(option.value)}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: scale(6),
    },

    label: {
        color: colors.accentContrast,
        fontSize: scale(14),
        fontWeight: "700",
    },

    pickerWrapper: {
        backgroundColor: colors.inputBackground,
        borderRadius: scale(12),
        borderWidth: 2,
        borderColor: colors.brand,
        overflow: "hidden",
    },
    picker: {
  color: colors.accentContrast,
  backgroundColor: colors.inputBackground,
  height: scale(48),
}
});