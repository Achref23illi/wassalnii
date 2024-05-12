// InboxPage.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import MessageComponent from "./MessageComponent"; // Adjust the path as needed

const InboxPage = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const handlePress = () => {
    navigation.navigate("MessengerScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <Text style={styles.headerText}>Inbox</Text>
      </View>
      <ScrollView contentContainerStyle={styles.messageList}>
        <MessageComponent
          title="Wassalni"
          message="You have a new message"
          profilePicture={require("../../assets/BPerson.png")}
          onPress={handlePress}
        />
      </ScrollView>
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
    paddingTop: 120, // Adjusting padding to ensure content starts below the blue header
  },
  headerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "SemiBold",
  },
  messageList: {
    padding: 20,
  },
});

export default InboxPage;
