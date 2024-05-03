import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const HomePage = ({ navigation }) => {
  const [welcomeUser, setWelcomeUser] = useState("Welcome User");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState("Fetching location...");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      setLocation(locationResult);
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: locationResult.coords.latitude,
          longitude: locationResult.coords.longitude,
        });
        if (reverseGeocode.length > 0) {
          setLocationName(
            `${reverseGeocode[0].district}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}`
          );
        }
      } catch (error) {
        setErrorMsg("Failed to fetch location");
      }
    })();
  }, [fadeAnim]);

  const handleProfileClick = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleGetRide = () => {
    navigation.navigate("GetRideScreen");
  };

  const handlePostTrip = () => {
    navigation.navigate("PostTripScreen");
  };

  let text = errorMsg ? errorMsg : locationName;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fullPage}>
        <Animated.Image
          source={require("../assets/WASWHITE.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            styles.contentArea,
            {
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.welcomeText}>{welcomeUser}</Text>
            <TouchableOpacity onPress={handleProfileClick}>
              <Ionicons name="person-circle-outline" size={32} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionCard} onPress={handleGetRide}>
              <View style={styles.optionContent}>
                <Image
                  source={require("../assets/images/get_ride.png")}
                  style={styles.optionImage}
                />
                <Text style={styles.optionText}>Get a Ride</Text>
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={handlePostTrip}
            >
              <View style={styles.optionContent}>
                <Image
                  source={require("../assets/images/post_trip.png")}
                  style={styles.optionImage}
                />
                <Text style={styles.optionText}>Post a Trip</Text>
                <Ionicons name="chevron-forward" size={24} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Location</Text>
            <Text style={styles.locationValue}>{text}</Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  fullPage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  contentArea: {
    height: "87%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start", // Adjusted to align items at the start of the view
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10, // Reduced the margin to bring elements closer
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10, // Adjusted vertical spacing
  },
  optionCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionContent: {
    alignItems: "center",
  },
  optionImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  locationContainer: {
    position: "absolute",
    bottom: 12,
    width: "100%",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationValue: {
    fontSize: 14,
  },
  logo: {
    width: 120,
    height: 80,
    position: "absolute",
    top: 25, // Adjust if needed to center vertically on different devices
    alignSelf: "center",
    zIndex: 10,
  },
});

export default HomePage;
