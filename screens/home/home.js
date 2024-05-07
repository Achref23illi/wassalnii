import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
  Alert,
} from "react-native";
import MapComponent from "./MapComponent";
import SearchComponent from "./SearchComponent";
import DatePickerComponent from "./DatePickerComponent";
import SearchButton from "./SearchButton";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [address, setAddress] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const marginTop = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(marginTop, {
      toValue: searchFocused ? -150 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchFocused]);

  const handleFocus = (status) => {
    setSearchFocused(status);
  };

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
    if (selectedDate) {
      navigation.navigate("fromScreen", {
        address: newAddress,
        date: selectedDate,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapComponent style={styles.map} />
      <View style={styles.topContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/WASWHITE.png")}
          resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View style={[styles.overlay, { marginTop: marginTop }]}>
          <View style={styles.inputContainer}>
            <SearchComponent
              style={styles.searchInput}
              onFocusChange={handleFocus}
              onAddressChange={handleAddressChange}
            />
            <View style={styles.bottomPart}>
              <DatePickerComponent
                style={styles.datePicker}
                onDateChange={setSelectedDate}
              />
              <SearchButton
                style={styles.searchButton}
                onPress={() => {
                  // console.log("Address:", address); // Debugging the address
                  console.log("Selected Date:", selectedDate); // Debugging the date

                  if (address) {
                    navigation.navigate("fromScreen", {
                      address: address,
                      date: selectedDate,
                    });
                  } else {
                    Alert.alert(
                      "Error",
                      "Please select both an address and a date."
                    );
                  }
                }}
              />
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject, // This will make the map take up the full screen
  },
  topContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E86AB",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    top: 20,
    width: 120,
    height: 120,
  },
  keyboardAvoidingView: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
  overlay: {
    flexDirection: "row", // Make the children align vertically
    justifyContent: "space-between",
    backgroundColor: "#2E86AB",
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    borderWidth: 0.5,
    borderColor: "#2E86AB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  datePicker: {
    flex: 1, // Make this take 30% of the width
  },
  searchButton: {
    position: "absolute", // Position the button absolutely
    right: 0, // Align it to the right
    bottom: 0, // Align it to the bottom
  },
  bottomPart: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
});

export default Home;
