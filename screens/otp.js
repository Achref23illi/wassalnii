import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { useFonts } from "expo-font";

const VerificationCodeMessage = ({ route }) => {
  const { phoneNumber } = route.params;
  const navigation = useNavigation();

  const handleChange = (text) => {
    // Simulated logic to check if the entered code is correct
    const correctCode = "123456"; // Assume this is the correct code

    if (text === correctCode) {
      // Navigate to the 'Home' page if the code is correct
      navigation.navigate("Main");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image style={styles.logo} source={require("../assets/images/otp.png")} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Verification code</Text>
        <Text style={styles.description}>
          We have sent the code verification to{"\n"}
          <Text style={styles.boldText}>+213 {phoneNumber}</Text>
        </Text>
        <OtpInput
          numberOfDigits={6}
          onTextChange={handleChange}
          placeholder="_"
          placeholderTextColor="gray"
          keyboardType="numeric"
          style={styles.input}
          theme={{
            containerStyle: styles.otpContainer,
            inputsContainerStyle: styles.otpInputsContainer,
            pinCodeContainerStyle: styles.otpPinCodeContainer,
            pinCodeTextStyle: styles.otpPinCodeText,
            focusStickStyle: styles.otpFocusStick,
            focusedPinCodeContainerStyle: styles.otpActivePinCodeContainer,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("EnterMobileNumber")}
        >
          <Text style={[styles.underlineText]}>Change phone number?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const CenteredVerificationCodeMessage = ({ route }) => {
  const { phoneNumber } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <VerificationCodeMessage route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,

    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
  },
  underlineText: {
    marginTop: 20,

    color: "#333",
  },
  otpContainer: {},
  otpInputsContainer: {
    justifyContent: "center",
  },
  otpPinCodeContainer: {
    width: 40,
    marginHorizontal: 3,
    height: 40,
  },
  otpPinCodeText: {
    fontSize: 24,
    color: "#333",
  },
  otpFocusStick: {
    height: 2,
    backgroundColor: "black",
  },
  otpActivePinCodeContainer: {
    borderWidth: 2,
    borderColor: "grey",
  },
});

export default CenteredVerificationCodeMessage;
