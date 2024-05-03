import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Animated,
} from "react-native";

const WelcomePage = ({ navigation }) => {
  const openLink = () => {
    Linking.openURL("https://github.com/Achref23illi");
  };

  const handleContinue = () => {
    navigation.navigate("phone");
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Image
          source={require("../assets/BPerson.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.Text style={[styles.headline, { opacity: fadeAnim }]}>
        Welcome to Wassalni App
      </Animated.Text>
      <Animated.Text style={[styles.description, { opacity: fadeAnim }]}>
        Read our{" "}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        . {'Tap "Agree & Continue" to accept the '}
        <Text style={styles.link} onPress={openLink}>
          Terms of Service
        </Text>
        .
      </Animated.Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: "#000000",
  },
  link: {
    color: "#32746D",
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#000000",
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 60,
    fontWeight: "bold",
  },
});

export default WelcomePage;
