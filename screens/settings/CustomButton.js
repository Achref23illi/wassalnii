import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const CustomButton = ({
  onPress,
  iconName,
  iconColor,
  iconBgColor,
  label,
  chevronColor,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: iconBgColor }]}>
        <FeatherIcon color={iconColor} name={iconName} size={20} />
      </View>

      <Text style={styles.rowLabel}>{label}</Text>

      <View style={styles.rowSpacer} />

      <FeatherIcon color={chevronColor} name="chevron-right" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    width: "100%",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontFamily: "Regular",
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

export default CustomButton;
