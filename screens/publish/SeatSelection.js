import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

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
          <FontAwesome6 name="arrow-down" size={24} color="#2E86AB" />
        </View>

        <TextInput
          style={styles.fixedInput}
          value={route.params.destinationAddress}
          editable={false} // make it non-editable
        />

        <View style={styles.seatSelector}>
          <TouchableOpacity onPress={decreaseSeats}>
            <Octicons name="diff-removed" size={60} color="#2E86AB" />
          </TouchableOpacity>
          <Text style={styles.seatText}>{seats}</Text>
          <TouchableOpacity onPress={increaseSeats}>
            <Octicons name="diff-added" size={60} color="#2E86AB" />
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
    height: 100,
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
  fixedInput: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
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
  seatText: {
    fontSize: 200,
    marginHorizontal: 20,
    color: "#121212",
    paddingHorizontal: 25,
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
  },
  directionIconContainer: {
    alignItems: "center", // Centers the icon horizontally
    marginTop: 10,
  },
});

export default SeatSelection;
