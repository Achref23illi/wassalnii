import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeybordView from "../components/CustomKb";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const confirmPasswordRef = useRef("");
  const { register } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !confirmPasswordRef.current
    ) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    if (passwordRef.current !== confirmPasswordRef.current) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current
    );
    setLoading(false);
    console.log("got result :", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <CustomKeybordView>
      <StatusBar stylee="dark" />
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-10"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require("../assets/images/register.png")}
          />
        </View>
        <View className="gap-8">
          <Text
            style={{ fontSize: hp(4), fontFamily: "Montserrat-Bold" }}
            className=" tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>
          <View>
            <View
              style={{ height: hp(7), borderWidth: 1, borderColor: "#ccc" }}
              className="flex-row gap-4 bg-neutral-100 items-center rounded-xl p-3 mb-3 "
            >
              <Ionicons name="person-outline" size={hp(2.5)} color="gray" />
              <TextInput
                style={{ fontSize: hp(1.8), fontFamily: "Montserrat-Regular" }}
                className="flex-1 font-semibold text-neutral-700"
                onChangeText={(value) => (usernameRef.current = value)}
                placeholder="Username"
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{ height: hp(7), borderWidth: 1, borderColor: "#ccc" }}
              className="flex-row gap-4 bg-neutral-100 items-center rounded-xl p-3 mb-3"
            >
              <Ionicons name="mail-outline" size={hp(2.5)} color="gray" />
              <TextInput
                style={{ fontSize: hp(1.8), fontFamily: "Montserrat-Regular" }}
                className="flex-1 font-semibold text-neutral-700"
                onChangeText={(value) => (emailRef.current = value)}
                placeholder="Email Address"
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{ height: hp(7), borderWidth: 1, borderColor: "#ccc" }}
              className="flex-row gap-4 bg-neutral-100 items-center rounded-xl p-3 mb-3 "
            >
              <Ionicons
                name="lock-closed-outline"
                size={hp(2.5)}
                color="gray"
              />
              <TextInput
                style={{ fontSize: hp(1.8), fontFamily: "Montserrat-Regular" }}
                className="flex-1 font-semibold text-neutral-700"
                onChangeText={(value) => (passwordRef.current = value)}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="gray"
              />
            </View>
            <View
              style={{ height: hp(7), borderWidth: 1, borderColor: "#ccc" }}
              className="flex-row gap-4 bg-neutral-100 items-center rounded-xl p-3 mb-3 "
            >
              <Ionicons
                name="lock-closed-outline"
                size={hp(2.5)}
                color="gray"
              />
              <TextInput
                style={{ fontSize: hp(1.8), fontFamily: "Montserrat-Regular" }}
                className="flex-1 font-semibold text-neutral-700"
                onChangeText={(value) => (confirmPasswordRef.current = value)}
                placeholder="Confirm Password"
                secureTextEntry
                placeholderTextColor="gray"
              />
            </View>

            <View className="pt-3">
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(8)} />
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.signInb}
                  onPress={handleRegister}
                >
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    className="text-center text-white"
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.6), fontFamily: "Montserrat-Regular" }}
                className="text-neutral-500 p-3 mb-3"
              >
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("signIn")}>
                <Text
                  style={{
                    fontSize: hp(1.6),
                    fontFamily: "Montserrat-Bold",
                    color: "#2E86AB",
                    paddingTop: hp(1.1),
                  }}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeybordView>
  );
};

export default SignUp;

export const styles = StyleSheet.create({
  signInb: {
    height: hp(6.5),
    borderRadius: 10,
    backgroundColor: "#2E86AB",
    alignItems: "center",
    justifyContent: "center",
  },
});
