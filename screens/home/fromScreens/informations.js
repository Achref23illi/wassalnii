import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const Information = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fromAddress, toAddress, date } = route.params;
  const [fontsLoaded] = useFonts({
    Bold: require("../../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  const [seats, setSeats] = useState(1);
  const handleNoButton = () => {
    navigation.navigate("MoreInformations", {
      fromAddress,
      toAddress,
      date,
      seats,
    });
  };
  const handleYesButton = () => {
    navigation.navigate("Friends", {
      fromAddress,
      toAddress,
      date,
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
        <Text style={styles.headerText}>Add your booking request details</Text>
      </View>

      <Image
        style={styles.image}
        source={require("../../../assets/images/Trip.gif")}
      />

      <View style={styles.return}>
        <Text style={styles.returnText}>Are you Traveling with someone?</Text>
        <TouchableOpacity style={styles.returnButton} onPress={handleYesButton}>
          <Text style={[styles.returnButtonText, { color: "#2E86AB" }]}>
            Yes, I am!
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color="#2E86AB"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.returnButton} onPress={handleNoButton}>
          <Text style={styles.returnButtonText}>No, I am alone</Text>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  image: {
    width: 350,
    height: 300,
    alignSelf: "center",
  },
  return: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  returnText: {
    fontSize: 40,
    fontFamily: "Bold",
  },
  returnButton: {
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  returnButtonText: {
    fontSize: 20,
    fontFamily: "SemiBold",
  },
});

export default Information;
