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

export default function Publish() {
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
    navigation.navigate("distination", {
      address: geoAddress[0].street,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
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
          navigation.navigate("distination", {
            address: details.formatted_address,
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
    position: "absolute",
    backgroundColor: "#2E86AB",
    width: "100%",
    height: 120,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    height: 60,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 140,
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
  headerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginTop: 70,
  },
});
