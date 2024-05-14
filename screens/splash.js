import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import test from "../api/text";

const { width } = Dimensions.get("window"); // Get the screen width

const Splash = ({ navigation }) => {
  // Start the car off-screen to the left
  const carAnim = useRef(new Animated.Value(-160)).current; // Use -100 to start off-screen to the left
  const logoAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate the car from left to right
    Animated.timing(carAnim, {
      toValue: 1000, // Move to the right of the screen (offscreen on the right)
      duration: 1000, // Slower animation, increased to 3000 milliseconds
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animate the logo opacity to 0 when the car is about halfway across the screen
    Animated.timing(logoAnim, {
      toValue: 0, // Fade out
      delay: 200, // Start fading out after 1.5 seconds, adjusted for slower car movement
      duration: 150, // Fade out over 1 second
      useNativeDriver: true,
    }).start(() => {
      navigation.replace("welcome"); // Navigate to your main app screen here
    });
  }, [carAnim, logoAnim, navigation]);

  useEffect(() => {
    test();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/WASWHITE.png")}
        style={[styles.logo, { opacity: logoAnim }]}
      />
      <Animated.Image
        source={require("../assets/car.png")}
        style={[styles.car, { transform: [{ translateX: carAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  logo: {
    position: "absolute",
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  car: {
    position: "absolute",
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
});

export default Splash;
