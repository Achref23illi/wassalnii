import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useFonts } from "expo-font";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const auth = getAuth();
const db = getFirestore();

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: username });

      // Add a new document with a generated id.
      await addDoc(collection(db, "users"), {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
      });

      console.log("User signed up with email:", user.email);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const [fontsLoaded] = useFonts({
    Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      style={{ flex: 1 }}
    >
      <View>
        <Image
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={require("../assets/WASWHITE.png")}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 20,
            paddingBottom: 50,
            height: "100%",
          }}
        >
          <View style={styles.head}>
            <Text style={styles.headText}>Sign Up</Text>
            <Text style={styles.headTextDescription}>
              Welcome to Wassalni the best ride sharing app in Algeria
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  head: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  headText: {
    fontFamily: "Bold",
    fontSize: 35,
  },
  headTextDescription: {
    marginTop: 10,
    fontFamily: "Regular",
    fontSize: 15,
    color: "#000",
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
    opacity: 1,
  },
  button: {
    backgroundColor: "#2E86AB",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "SemiBold",
  },
});
export default SignUp;
