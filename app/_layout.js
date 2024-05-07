import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, router, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (typeof isAuthenticated == "undedfined") return;
    const inApp = segments[0] === "app";
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("home");
    }
    if (isAuthenticated == false) {
      // redirect to signIn
      router.replace("welcome");
    }
  }, [isAuthenticated]);
  return <Slot />;
};

const _layout = () => {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
