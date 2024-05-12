import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env"; // Import the API key
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function FromScreen({ route }) {
  const navigation = useNavigation();
  const { address, date } = route.params;
  const dateObject = new Date(date);

  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  const [location, setLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const ref = useRef();

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    // Get the address from the location coordinates
    let geoAddress = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Set the address in the GooglePlacesAutocomplete input field
    ref.current.setAddressText(geoAddress[0].street);

    // Navigate to the next page
    navigation.navigate("distination", {
      fromAddress: details.formatted_address, // Pass the "going from" address
      toAddress: address, // Pass the "going to" address
      date: dateObject, // Pass the date object
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5
            name="arrow-left"
            size={24}
            color="white"
            style={{ marginTop: 20 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Where are leaving from ?</Text>
      </View>

      <Image
        style={styles.imageMiddle}
        source={require("../../assets/images/bridge.png")}
      />

      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Enter your pickup address"
        fetchDetails={true}
        onPress={(data, details = null) => {
          const wilaya = details.address_components.find((component) =>
            component.types.includes("administrative_area_level_1")
          );
          setSelectedAddress(details.formatted_address);
          console.log(data, details);
          // Convert the date object to a string before passing it as a parameter
          navigation.navigate("Information", {
            fromAddress: details.formatted_address, // Pass the "going from" address
            toAddress: address, // Pass the "going to" address
            date: dateObject.toISOString(), // Pass the date as a string
          });
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY, // Use the imported API key
          language: "en",
          types: "geocode", // See Google API for other types
          components: "country:DZ", // Restrict suggestions to Algeria
        }}
        styles={{
          textInput: {
            ...styles.searchBar,
            fontFamily: "Bold", // Replace with your font family
          },
        }}
        renderHeaderComponent={() => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={fetchLocation}
          >
            <Ionicons name="navigate-circle-outline" size={24} color="black" />
            <Text style={styles.itemText}>Use current location</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    fontFamily: "SemiBold",
    marginLeft: 20,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    height: 60,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 17,
    fontFamily: "SemiBold",
  },
  imageMiddle: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
});

export default FromScreen;
