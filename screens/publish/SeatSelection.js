import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const SeatSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [seats, setSeats] = useState(1); // Default to 1 seat

  const increaseSeats = () => {
    setSeats((prev) => (prev < 5 ? prev + 1 : prev)); // Assume max 5 seats
  };

  const decreaseSeats = () => {
    setSeats((prev) => (prev > 1 ? prev - 1 : prev)); // Minimum 1 seat
  };
  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Number of Seats</Text>
      </View>

      <View style={styles.contentContainer}>
        <TextInput
          style={styles.fixedInput}
          value={route.params.pickupAddress}
          editable={false} // make it non-editable
        />

        <View style={styles.directionIconContainer}>
          <FontAwesome name="angle-double-down" size={24} color="#2E86AB" />
        </View>

        <TextInput
          style={styles.fixedInput}
          value={route.params.destinationAddress}
          editable={false} // make it non-editable
        />

        <View style={styles.seatSelector}>
          <TouchableOpacity onPress={decreaseSeats}>
            <AntDesign name="minuscircle" size={36} color="black" />
          </TouchableOpacity>
          <View style={styles.number}>
            <MaterialCommunityIcons name="seatbelt" size={65} color="black" />
            <Text style={styles.seatText}>{seats}</Text>
          </View>
          <TouchableOpacity onPress={increaseSeats}>
            <AntDesign name="pluscircle" size={36} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("DateSelection", {
              pickupAddress: route.params.pickupAddress,
              destinationAddress: route.params.destinationAddress,
              seats,
            })
          }
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Make sure the header is above other content
  },
  contentContainer: {
    paddingTop: 150, // Make sure there is space for the header
    paddingHorizontal: 20,
  },
  number: {
    flexDirection: "row",
    alignItems: "center",
  },
  fixedInput: {
    backgroundColor: "#f0f0f0",
    height: 60,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    fontSize: 16,
    fontFamily: "Bold",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginLeft: 10,
  },
  seatSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  number: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40,
  },
  seatText: {
    fontSize: 70,
    color: "#121212",
    fontFamily: "Regular",
  },
  nextButton: {
    backgroundColor: "#2E86AB",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 40,
    width: "80%",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "SemiBold",
  },
  directionIconContainer: {
    alignItems: "center", // Centers the icon horizontally
    marginTop: 10,
  },
});

export default SeatSelection;
