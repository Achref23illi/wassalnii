import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFonts } from "expo-font";

const TimePickerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const { pickupAddress, destinationAddress, seats, date } = route.params;

  const onChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) {
      const formattedTime = `${String(selectedTime.getHours()).padStart(
        2,
        "0"
      )}:${String(selectedTime.getMinutes()).padStart(2, "0")}`;
      setTime(selectedTime);
      console.log("Selected Time:", formattedTime);
    }
  };

  // Format time with leading zeros
  const formattedTime = `${String(time.getHours()).padStart(2, "0")}:${String(
    time.getMinutes()
  ).padStart(2, "0")}`;

  const handleNextPress = () => {
    console.log("Navigating with Time:", formattedTime);
    navigation.navigate("return", {
      pickupTime: formattedTime,
      pickupAddress,
      destinationAddress,
      seats,
      date,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 20 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>When are you going?</Text>
      </View>

      <Image
        style={styles.imageMiddle}
        source={require("../../assets/images/bridge.png")}
      />

      <TouchableOpacity
        style={styles.timeButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.timeButtonText}>
          {`Pickup Time: ${formattedTime}`}
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

      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
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
    height: 120,
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
    marginTop: 20,
    fontFamily: "SemiBold",
    marginLeft: 20,
  },
  imageMiddle: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  timeButton: {
    backgroundColor: "#2E86AB",
    marginTop: 100,
    padding: 20,
    borderRadius: 30,
    margin: 20,
    width: "60%",
    alignSelf: "center",
  },
  timeButtonText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "SemiBold",
    textAlign: "center",
  },
  nextButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#2E86AB",
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SemiBold",
  },
});

export default TimePickerScreen;
