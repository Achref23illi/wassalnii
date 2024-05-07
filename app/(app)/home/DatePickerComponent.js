import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const DatePickerComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState("Today");
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    onDateChange(currentDate); // Call onDateChange with the selected date

    // Update date text
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (currentDate.toDateString() === today.toDateString()) {
      setDateText("Today");
    } else if (
      new Date(currentDate).setHours(0, 0, 0, 0) ===
      new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString()
    ) {
      setDateText("Tomorrow");
    } else {
      setDateText(currentDate.toLocaleDateString());
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={showDatePicker}
        style={styles.datePickerButton}
      >
        <Ionicons name="calendar" size={24} color="#2E86AB" />
        <Text style={styles.dateText}>{dateText}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    width: 122,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  dateText: {
    fontFamily: "Bold",
    marginLeft: 10,
    color: "#2E86AB",
    fontSize: 16,
  },
});

export default DatePickerComponent;
