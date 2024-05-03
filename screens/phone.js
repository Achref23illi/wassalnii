import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

export default function Phone() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("Otp", { phoneNumber: mobileNumber });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 200, height: 200, resizeMode: "contain" }}
          source={require("../assets/images/phone.png")}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter your mobile number</Text>
        <Text style={styles.subtitle}>We will send you confirmation code</Text>

        <View style={styles.inputContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCode}>+213</Text>
          </View>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
            placeholder="999 999 999"
          />
        </View>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logoContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  countryCodeContainer: {
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
  numpad: {
    marginTop: 24,
  },
  numpadRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  numpadButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  numpadButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
