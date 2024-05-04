import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import Swiper from "react-native-swiper";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef(null);
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initial value for scale: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 20,
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim]);

  const nextPage = () => {
    swiperRef.current.scrollBy(1);
  };

  const continueToPhone = () => {
    navigation.navigate("phone");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={(index) => setProgress((index + 1) / 3)}
        activeDotColor="#2E86AB"
      >
        <View style={styles.pageContainer}>
          <Animated.View
            style={{ ...styles.circle, transform: [{ scale: scaleAnim }] }}
          >
            <Image
              source={require("../assets/images/page1.png")}
              style={styles.image}
            />
          </Animated.View>
          <Animated.Text style={{ ...styles.bigText, opacity: fadeAnim }}>
            Request Ride
          </Animated.Text>
          <Animated.Text style={{ ...styles.description, opacity: fadeAnim }}>
            Request a ride get picked up by a nearby traveller
          </Animated.Text>
        </View>
        <View style={styles.pageContainer}>
          <Animated.View
            style={{ ...styles.circle, transform: [{ scale: scaleAnim }] }}
          >
            <Image
              source={require("../assets/images/page2.png")}
              style={styles.image}
            />
          </Animated.View>
          <Animated.Text style={{ ...styles.bigText, opacity: fadeAnim }}>
            Confirm Your Driver
          </Animated.Text>
          <Animated.Text style={{ ...styles.description, opacity: fadeAnim }}>
            Huge drivers network helps you find comfortable, safe and cheap ride
          </Animated.Text>
        </View>
        <View style={styles.pageContainer}>
          <Animated.View
            style={{ ...styles.circle, transform: [{ scale: scaleAnim }] }}
          >
            <Image
              source={require("../assets/images/page4.png")}
              style={styles.image}
            />
          </Animated.View>
          <Animated.Text style={{ ...styles.bigText, opacity: fadeAnim }}>
            Track Your Ride
          </Animated.Text>
          <Animated.Text style={{ ...styles.description, opacity: fadeAnim }}>
            Follow your driver in advance and be able to track your current
            location in real time on the map
          </Animated.Text>
        </View>
      </Swiper>
      <Progress.Bar
        progress={progress}
        width={150}
        color={"#2E86AB"}
        unfilledColor={"#ddd"}
        borderRadius={10}
        borderWidth={0}
        style={styles.progressBar}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={progress === 1 ? continueToPhone : nextPage}
        >
          <Text style={styles.buttonText}>
            {progress === 1 ? "Continue" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: Dimensions.get("window").width * 0.8,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#2E86AB",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  circle: {
    backgroundColor: "#2E86AB",
    width: 250,
    height: 250,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 190,
    height: 190,
  },
  bigText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    width: "80%",
  },
});

export default WelcomeScreen;
