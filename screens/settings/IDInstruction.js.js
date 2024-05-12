// IDInstruction.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const IDInstruction = () => {
  const navigation = useNavigation();
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const openCamera = async (side) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (side === "front") {
        setFrontImage(result.uri);
      } else {
        setBackImage(result.uri);
      }
    }
  };

  const handleFrontCapture = () => {
    openCamera("front");
  };

  const handleBackCapture = () => {
    openCamera("back");
  };

  const handleProceed = () => {
    if (frontImage && backImage) {
      navigation.navigate("FaceVerification");
    } else {
      Alert.alert("Please capture both sides of the ID.");
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="close"
        size={30}
        color="#000"
        style={styles.closeIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.titleText}>Scan your ID</Text>

      <Image
        source={require("../../assets/images/id.png")}
        style={{
          width: 300,
          height: 300,
          alignSelf: "center",
          resizeMode: "contain",
        }}
      />

      <Text style={styles.subtitleText}>Keep these tips in mind:</Text>

      <View style={styles.tipContainer}>
        <Text style={styles.tipText}>
          • Make sure your ID is well lit and in focus
        </Text>
        <Text style={styles.tipText}>• Use a dark background for contrast</Text>
        <Text style={styles.tipText}>• Get the whole ID in the frame</Text>
      </View>

      {frontImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Front Image:</Text>
          <Image source={{ uri: frontImage }} style={styles.previewImage} />
        </View>
      )}

      {backImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Back Image:</Text>
          <Image source={{ uri: backImage }} style={styles.previewImage} />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.captureButton, frontImage && styles.disabledButton]}
          onPress={handleFrontCapture}
          disabled={!!frontImage}
        >
          <Text style={styles.buttonText}>Capture Front</Text>
          {frontImage && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#fff"
              style={styles.validIcon}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.captureButton, backImage && styles.disabledButton]}
          onPress={handleBackCapture}
          disabled={!!backImage}
        >
          <Text style={styles.buttonText}>Capture Back</Text>
          {backImage && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#fff"
              style={styles.validIcon}
            />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  closeIcon: {
    marginTop: 50,
    alignSelf: "flex-end",
  },
  titleText: {
    color: "#000",
    fontSize: 24,
    fontFamily: "Bold",
    textAlign: "center",
    marginTop: 40,
  },
  subtitleText: {
    color: "#979593",
    fontSize: 16,
    fontFamily: "Regular",
    textAlign: "center",
    marginTop: 10,
  },
  tipContainer: {
    marginTop: 20,
  },
  tipText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Regular",
    marginVertical: 5,
  },
  previewContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  previewText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "SemiBold",
  },
  previewImage: {
    width: 200,
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  captureButton: {
    backgroundColor: "#5FBB97",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#979593",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SemiBold",
  },
  validIcon: {
    marginLeft: 10,
  },
  proceedButton: {
    backgroundColor: "#5FBB97",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "100%",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "SemiBold",
  },
});

export default IDInstruction;
