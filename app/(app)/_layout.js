import React from "react";
import { View, Text } from "react-native";
import { Stack, Screen } from "expo-router";
import Home from "./home/home";

export default function _layout() {
  return (
    <Stack>
      <Screen path="home" component={Home} />
    </Stack>
  );
}
