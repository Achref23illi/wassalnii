import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
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
  const [fromAddress, setFromAddress] = useState(null);
  const ref = useRef();

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    let geoAddress = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    const address = geoAddress[0].street
      ? `${geoAddress[0].street}, ${geoAddress[0].city}`
      : geoAddress[0].city;

    ref.current.setAddressText(address);
    setFromAddress(address);

    console.log("Current Location Address:", address);

    navigation.navigate("distination", {
      address,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <Text style={styles.headerText}>Where are you leaving from?</Text>
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
          const formattedAddress = details
            ? details.formatted_address
            : data.description;
          setFromAddress(formattedAddress);
          console.log("Selected Address:", formattedAddress);
          navigation.navigate("distination", {
            address: formattedAddress,
          });
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
          types: "geocode",
          components: "country:DZ",
        }}
        styles={{
          textInput: {
            ...styles.searchBar,
            fontFamily: "Bold",
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
});
