import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
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
  const [toAddress, setToAddress] = React.useState("");
  const [fontsLoaded] = useFonts({
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 20 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Where are you going?</Text>
      </View>

      <Image
        style={styles.imageMiddle}
        source={require("../../assets/images/bridge.png")}
      />

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
          const formattedAddress = details
            ? details.formatted_address
            : data.description;
          setToAddress(formattedAddress);
          console.log("Selected Destination Address:", formattedAddress);
          navigation.navigate("seat", {
            pickupAddress: route.params.address,
            destinationAddress: formattedAddress,
          });
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
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    fontFamily: "Bold",
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
    alignItems: "center",
    marginTop: 10,
  },
});

export default Destination;
