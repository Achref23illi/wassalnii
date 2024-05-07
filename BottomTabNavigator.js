import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomePage from "./screens/home/home";
import InboxPage from "./screens/InboxPage";
import Publish from "./screens/publish/Publish";
import { HeaderTitle } from "@react-navigation/elements";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Publish") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Inbox") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2E86AB",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          height: 70, // Adjust the height here
        },
        tabBarLabelStyle: {
          marginBottom: 20, // Reduce space between icon and label
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Publish" component={Publish} />
      <Tab.Screen name="Inbox" component={InboxPage} />
    </Tab.Navigator>
  );
}
