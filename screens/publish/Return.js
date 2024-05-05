import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { MaterialIcons } from "@expo/vector-icons";

const Return = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pickupTime, pickupAddress, destinationAddress, seats, date } =
    route.params;

  const handleYesButton = () => {
    navigation.navigate("returnDate", {
      pickupTime,
      pickupAddress,
      destinationAddress,
      seats,
      date,
    });
  };

  const handleNoButton = () => {
    navigation.navigate("price", {
      pickupTime,
      pickupAddress,
      destinationAddress,
      seats,
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
        <Text style={styles.headerText}>Are you coming back as well?</Text>
      </View>

      <Image
        source={require("../../assets/images/return.png")}
        style={styles.image}
      />

      <View style={styles.return}>
        <Text style={styles.returnText}>Publish your return ride now!</Text>
        <TouchableOpacity style={styles.returnButton} onPress={handleYesButton}>
          <Text style={[styles.returnButtonText, { color: "#2E86AB" }]}>
            Yeah, Sure!
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color="#2E86AB"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.returnButton} onPress={handleNoButton}>
          <Text style={styles.returnButtonText}>No, thanks</Text>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ... rest of your code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bleu: {
    backgroundColor: "#2E86AB",
    height: 100,
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
  image: {
    width: 350,
    height: 300,
    alignSelf: "center",
  },
  return: {
    marginHorizontal: 30,
  },
  returnText: {
    fontSize: 40,
    fontFamily: "SemiBold",
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

export default Return;
