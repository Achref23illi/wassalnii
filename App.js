import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import splash from "./screens/splash";
import phone from "./screens/phone";
import otp from "./screens/otp";
import Welcome from "./screens/welcome";
import BottomTabNavigator from "./BottomTabNavigator";
import From from "./screens/location/from";
import To from "./screens/location/to";
import Distination from "./screens/publish/distination";
import SeatSelection from "./screens/publish/SeatSelection";
import { Calendar } from "react-native-calendars";
import DateSelection from "./screens/publish/DateSelection";
import PickUp from "./screens/publish/PickUp";
import Return from "./screens/publish/Return";
import ReturnDate from "./screens/publish/ReturnDate";
import Price from "./screens/publish/Price";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="phone"
          component={phone}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={otp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="from"
          component={From}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="to"
          component={To}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="distination"
          component={Distination}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="seat"
          component={SeatSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DateSelection"
          component={DateSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pickup"
          component={PickUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="return"
          component={Return}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="returnDate"
          component={ReturnDate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="price"
          component={Price}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
