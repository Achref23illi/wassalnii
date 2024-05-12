// MessengerScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

const MessengerScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      text: "Hello [User's Name],\n\nWe are thrilled to have you join the Wassalni community! 🚗✨ Whether you're looking for a ride or sharing one, we are here to make your journey smooth, safe, and enjoyable.\n\nIf you need any assistance or have questions, our support team is just a message away. Enjoy your ride with Wassalni!\n\nHappy traveling!",
      sender: "Wassalni",
    },
  ]);

  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const sendMessage = () => {
    if (message.trim().length > 0) {
      setChat([...chat, { text: message, sender: "user" }]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Welcome to Wassalni</Text>
      </View>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {chat.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageWrapper,
              msg.sender === "user"
                ? styles.userMessageWrapper
                : styles.wassalniMessageWrapper,
            ]}
          >
            {msg.sender !== "user" && (
              <Image
                source={require("../../assets/BPerson.png")}
                style={styles.profilePicture}
              />
            )}
            <View
              style={[
                styles.chatBubble,
                msg.sender === "user"
                  ? styles.userBubble
                  : styles.wassalniBubble,
              ]}
            >
              <Text
                style={[
                  styles.chatMessage,
                  msg.sender === "user" && styles.userMessage,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bleu: {
    position: "absolute",
    backgroundColor: "#2E86AB",
    height: 120,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 10,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginLeft: 40,
  },
  chatContainer: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  messageWrapper: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "flex-start",
  },
  wassalniMessageWrapper: {
    justifyContent: "flex-start",
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  chatBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 15,
  },
  wassalniBubble: {
    backgroundColor: "#f2f2f2",
    marginLeft: 10,
  },
  userBubble: {
    backgroundColor: "#2E86AB",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  chatMessage: {
    fontSize: 16,
    fontFamily: "Regular",
    color: "#121212",
  },
  userMessage: {
    color: "#fff",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#2E86AB",
    borderRadius: 25,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessengerScreen;
