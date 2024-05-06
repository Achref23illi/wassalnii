import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env"; // Import the API key
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function PickUpLocation() {
  const navigation = useNavigation();
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
    navigation.navigate("Main", {
      address: geoAddress[0].street,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.goBack();
            navigation.navigate("Home", { selectedAddress: selectedAddress });
          }}
        >
          <FontAwesome5
            name="arrow-left"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Where are you leaving from?</Text>
      </View>

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
          navigation.navigate("Home", {
            selectedAddress: details.formatted_address,
          });
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY, // Use the imported API key
          language: "en",
          types: "geocode", // See Google API for other types
          components: "country:DZ", // Restrict suggestions to Algeria
        }}
        styles={{
          textInput: styles.searchBar,
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginLeft: 20,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginHorizontal: 25,
    borderRadius: 10,
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    fontFamily: "Regular",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    width: "90%",
    marginHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
