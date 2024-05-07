import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useFonts } from "expo-font";

const SearchComponent = ({ onFocusChange, onAddressChange }) => {
  const [fontsLoaded] = useFonts({
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
  });
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          onAddressChange(details.formatted_address); // Call onAddressChange with the selected address
        }}
        query={{
          key: "AIzaSyAyJQGadvrBMmW68SMLduwmrTmQwOmwre4",
          language: "en",
          components: "country:dz", // restricts your search to Algeria
        }}
        styles={{
          textInputContainer: {
            width: "100%",
          },
          description: {
            fontFamily: "Bold",
          },
          predefinedPlacesDescription: {
            color: "#2E86AB",
          },
        }}
        onFocus={() => onFocusChange(true)} // Call onFocusChange when the input field is focused
        onBlur={() => onFocusChange(false)} // Call onFocusChange when the input field is blurred
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});

export default SearchComponent;
