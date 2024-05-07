import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";

const Destination = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [fontsLoaded] = useFonts({
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
        <Text style={styles.headerText}>Where are you going?</Text>
      </View>

      <TextInput
        style={styles.fixedAddress}
        value={route.params.address}
        editable={false} // make it non-editable
      />

      {/* Icon indicating direction from the fixed address to the search bar */}
      <View style={styles.directionIconContainer}>
        <FontAwesome name="angle-double-down" size={24} color="#2E86AB" />
      </View>

      <GooglePlacesAutocomplete
        placeholder="Enter your destination address"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            setSelectedAddress(details.formatted_address);
            navigation.navigate("seat", {
              pickupAddress: route.params.address,
              destinationAddress: details.formatted_address,
            });
          }
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
          types: "geocode",
          components: "country:DZ",
        }}
        styles={{
          textInput: styles.searchBar,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bleu: {
    position: "absolute",
    backgroundColor: "#2E86AB",
    height: 10,
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  searchBar: {
    backgroundColor: "#f0f0f0",
    height: 60,
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    fontFamily: "Bold",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginLeft: 40,
  },
  fixedAddress: {
    backgroundColor: "#f0f0f0",
    color: "#ccc",
    height: 60,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 50,
    borderWidth: 2,
    borderColor: "#ddd",
    fontSize: 16,
    fontFamily: "Bold",
  },
  directionIconContainer: {
    alignItems: "center", // Centers the icon horizontally
    marginTop: 10, // Spacing from the address input to the icon
  },
});

export default Destination;
