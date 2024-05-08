import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const [fontsLoaded] = useFonts({
    Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.head}>
        <Text style={styles.headText}>Login</Text>
        <Text style={styles.headTextDescription}>Welcome back to Wassalni</Text>
        <Image
          style={styles.headtImage}
          source={require("../assets/images/dist.gif")}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.fp}>
        <Text style={styles.fpText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bContainer}>
        <Text style={styles.bText}>Don't have an account?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.buttono}
        >
          <Text style={styles.buttonTexto}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 15,
    fontFamily: "Regular",
    marginBottom: 10,
  },
  fp: {
    marginBottom: 40,
    right: 50,
    width: "40",
    alignSelf: "flex-end",
  },
  fpText: {
    color: "#2E86AB",
    fontFamily: "SemiBold",
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    height: 40,
    backgroundColor: "#2E86AB",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  bContainer: {
    flexDirection: "row",
  },
  bText: {
    fontFamily: "Regular",
    fontSize: 16,
    marginRight: 10,
    color: "#ccc",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SemiBold",
    fontSize: 18,
  },
  buttonTexto: {
    color: "#2E86AB",
    textAlign: "center",
    fontFamily: "Bold",
    borderBottomWidth: 0.5,
    width: "auto",
    fontSize: 16,
    borderColor: "#2E86AB",
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    fontSize: 50,
    fontFamily: "Bold",
    width: "80%",
    textAlign: "center",
  },
  headTextDescription: {
    fontSize: 20,
    fontFamily: "Regular",
    width: "80%",
    textAlign: "center",
  },
  headtImage: {
    width: 250,
    height: 250,
  },
});
