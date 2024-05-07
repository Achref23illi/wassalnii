import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

const Login = () => {
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
          // value={ }
          // onChangeText={text => }
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          // value={ }
          // onChangeText={text => }
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.buttono}>
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily: "SemiBold",
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    height: 50,
    backgroundColor: "#2E86AB",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttono: {
    height: 50,
    borderWidth: 2,
    borderColor: "#2E86AB",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "SemiBold",
    fontSize: 20,
  },
  buttonTexto: {
    color: "#2E86AB",
    textAlign: "center",
    fontFamily: "SemiBold",
    fontSize: 20,
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    fontSize: 50,
    fontFamily: "Bold",
  },
  headTextDescription: {
    fontSize: 20,
    fontFamily: "Regular",
  },
  headtImage: {
    width: 250,
    height: 250,
  },
});
