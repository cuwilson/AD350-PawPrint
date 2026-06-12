import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "@/styles/colors";
import { scale } from "@/styles/sizes";

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder = "",
  multiline = false,
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      {/* Field label shown above the input */}
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(10, 40, 56, 0.45)"
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
      />
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

  input: {
    backgroundColor: colors.inputBackground,

    borderRadius: scale(12),

    paddingHorizontal: scale(14),
    paddingVertical: scale(12),

    color: colors.accentContrast,
    fontSize: scale(16),
  },

  multilineInput: {
    minHeight: scale(100),
  },
});