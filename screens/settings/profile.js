import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "./CustomButton"; // Adjust the import path as needed
import ImportantButton from "./ImportantButton"; // Adjust the import path as needed

const Profile = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profileData.profilePicture }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.profileEmail}>{profileData.email}</Text>

        <ImportantButton
          onPress={() => {
            console.log("Verify Identity button pressed");
            navigation.navigate("IDInstruction");
          }}
          iconName="check-circle"
          iconColor="#fff"
          iconBgColor="#d9534f"
          label="Verify Identity"
        />

        <CustomButton
          onPress={() => {
            console.log("Language button pressed");
          }}
          iconName="globe"
          iconColor="#fff"
          iconBgColor="#fe9400"
          label="Language"
          chevronColor="#C6C6C6"
        />

        <CustomButton
          onPress={() => {
            console.log("Notifications button pressed");
          }}
          iconName="bell"
          iconColor="#fff"
          iconBgColor="#fe9400"
          label="Notifications"
          chevronColor="#C6C6C6"
        />

        <CustomButton
          onPress={() => {
            console.log("Privacy button pressed");
          }}
          iconName="lock"
          iconColor="#fff"
          iconBgColor="#fe9400"
          label="Privacy"
          chevronColor="#C6C6C6"
        />

        <CustomButton
          onPress={() => {
            console.log("Security button pressed");
          }}
          iconName="shield"
          iconColor="#fff"
          iconBgColor="#fe9400"
          label="Security"
          chevronColor="#C6C6C6"
        />

        <CustomButton
          onPress={() => {
            console.log("Help button pressed");
          }}
          iconName="help-circle"
          iconColor="#fff"
          iconBgColor="#fe9400"
          label="Help"
          chevronColor="#C6C6C6"
        />
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          console.log("Logout pressed");
        }}
      >
        <Ionicons name="log-out-outline" size={24} color="#d9534f" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bleu: {
    backgroundColor: "#2E86AB",
    width: "100%",
    height: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // Adjusting padding to ensure content starts below the blue header
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginTop: 30,
  },
  profileContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    justifyContent: "center", // Distribute buttons evenly
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontFamily: "Bold",
    color: "#121212",
    marginBottom: 3,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#979593",
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: "#2E86AB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  editProfileButtonText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "SemiBold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
  },
  logoutButtonText: {
    color: "#d9534f",
    fontSize: 16,
    fontFamily: "SemiBold",
    marginLeft: 10,
  },
});

export default Profile;
