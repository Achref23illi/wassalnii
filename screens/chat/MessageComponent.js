// MessageComponent.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";

const MessageComponent = ({ title, message, profilePicture, onPress }) => {
  return (
    <TouchableOpacity style={styles.messageContainer} onPress={onPress}>
      <Image source={profilePicture} style={styles.profilePicture} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.messageText}>{message}</Text>
          <FontAwesome name="circle" size={12} color="red" />
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C6C6C6" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    marginBottom: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ddd",
    marginRight: 10,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    fontFamily: "Bold",
    color: "#121212",
  },
  messageText: {
    fontSize: 14,
    fontFamily: "SemiBold",
    color: "#666",
    marginRight: 50,
  },
});

export default MessageComponent;
