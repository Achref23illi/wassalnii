import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Price = () => {
  const navigation = useNavigation();
  const [price, setPrice] = useState(150);

  const increasePrice = () => {
    setPrice(price + 50);
  };

  const decreasePrice = () => {
    if (price > 0) {
      setPrice(price - 50);
    }
  };
  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
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
        <Text style={styles.headerText}>Set your price per seat</Text>
      </View>

      <View style={styles.priceContainer}>
        <TouchableOpacity onPress={decreasePrice}>
          <AntDesign name="minuscircle" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.priceText}>{price} DA</Text>
        <TouchableOpacity onPress={increasePrice}>
          <AntDesign name="pluscircle" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.publishButton}>
        <Text style={styles.publishButtonText}>Publish Your Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between", // Add this line
    paddingBottom: 20,
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
  priceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  priceText: {
    fontSize: 60,
    color: "#000",
    paddingHorizontal: 20,
    fontFamily: "SemiBold",
  },
  publishButton: {
    backgroundColor: "#2E86AB",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    alignSelf: "center",
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "SemiBold",
  },
});

export default Price;
