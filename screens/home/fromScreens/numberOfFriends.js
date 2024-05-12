import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AntDesign } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";

const NumberOfFriends = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [seats, setSeats] = useState(1);
  const { fromAddress, toAddress, date } = route.params;
  const increaseSeats = () => {
    setSeats((prev) => (prev < 5 ? prev + 1 : prev)); // Assume max 5 seats
  };

  const decreaseSeats = () => {
    setSeats((prev) => (prev > 1 ? prev - 1 : prev)); // Minimum 1 seat
  };
  const [fontsLoaded] = useFonts({
    Bold: require("../../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
  });
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
        <Text style={styles.headerText}>How many?</Text>
      </View>

      <View style={styles.middle}>
        <Image
          style={styles.imageMiddle}
          source={require("../../../assets/images/bridge.png")}
        />

        <Text style={styles.middleText}>
          How many people are going, including you?
        </Text>

        <View style={styles.seatSelector}>
          <TouchableOpacity onPress={decreaseSeats}>
            <AntDesign name="minuscircle" size={36} color="black" />
          </TouchableOpacity>
          <View style={styles.number}>
            <FontAwesome5 name="user-friends" size={70} color="black" />
            <Text style={styles.seatText}>{seats}</Text>
          </View>
          <TouchableOpacity onPress={increaseSeats}>
            <AntDesign name="pluscircle" size={36} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("MoreInformations", {
              fromAddress,
              toAddress,
              date,
              seats,
            })
          }
        >
          <Text style={styles.nextButtonText}>Next</Text>
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
  imageMiddle: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  middle: {
    width: "100%",
    flex: 1,
  },
  middleText: {
    width: "90%",
    fontSize: 22,
    fontFamily: "SemiBold",
    textAlign: "center",
    marginTop: 20,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 60,
  },
  seatSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  number: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40,
  },
  seatText: {
    fontSize: 80,
    color: "#121212",
    fontFamily: "Regular",
  },
  nextButton: {
    backgroundColor: "transparent",
    borderRadius: 20,
    paddingVertical: 10,
    width: "100%",
    position: "absolute",
    bottom: 40,
    right: 50,
    alignSelf: "flex-end",
  },
  nextButtonText: {
    color: "#2E86AB",
    fontSize: 35,
    alignSelf: "flex-end",
    fontFamily: "SemiBold",
  },
});

export default NumberOfFriends;
