import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const TimePickerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const { pickupAddress, destinationAddress, seats, date } = route.params;

  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>When are you going?</Text>
      </View>

      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.timeButtonText}>
          {`Pickup Time: ${time.getHours()}:${time.getMinutes()}`}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
          is24Hour={true} // Change this based on your locale if necessary
        />
      )}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate("return", {
            pickupTime: time.toISOString(),
            pickupAddress,
            destinationAddress,
            seats,
            date,
          })
        }
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bleu: {
    backgroundColor: "#2E86AB",
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginLeft: 20,
  },
  timeButton: {
    backgroundColor: "#2E86AB",
    marginTop: 100,
    padding: 20,
    borderRadius: 30,
    margin: 20,
  },
  timeButtonText: {
    color: "#fff",
    fontSize: 50,
    fontFamily: "SemiBold",
    textAlign: "center",
  },
  nextButton: {
    position: "absolute", // Position button in the bottom-right
    right: 20,
    bottom: 20,
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 50, // Circular button
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#2E86AB",
    fontSize: 30,
    fontFamily: "SemiBold",
  },
});

export default TimePickerScreen;
