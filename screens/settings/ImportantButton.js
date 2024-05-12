import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const ImportantButton = ({
  onPress,
  iconName,
  iconColor,
  iconBgColor,
  label,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.importantRow}>
      <View style={[styles.importantRowIcon, { backgroundColor: iconBgColor }]}>
        <FeatherIcon color={iconColor} name={iconName} size={24} />
      </View>

      <Text style={styles.importantRowLabel}>{label}</Text>

      <View style={styles.rowSpacer} />

      <FeatherIcon color="#fff" name="chevron-right" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  importantRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#2E86AB",
    borderRadius: 20,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    width: "100%",
  },
  importantRowIcon: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  importantRowLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

export default ImportantButton;
