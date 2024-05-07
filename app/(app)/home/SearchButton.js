import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const SearchButton = ({ onPress }) => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome5 name="search" size={18} color="#2E86AB" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    height: 40,
    width: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});

export default SearchButton;
