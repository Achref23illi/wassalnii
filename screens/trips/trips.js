import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Trips = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigation = useNavigation();
  const route = useRoute();
  const { upcomingTrips = [], completedTrips = [] } = route.params || {};

  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const renderTripCard = (trip) => (
    <View style={styles.card}>
      <View style={styles.tripRow}>
        <Text style={styles.dateText}>{trip.date}</Text>
        <View style={styles.tripRowTime}>
          <FontAwesome5 name="clock" size={26} color="#2E86AB" />
          <Text style={styles.tripTime}>{trip.startTime}</Text>
        </View>
      </View>
      <Text style={styles.routeText}>
        {trip.startLocation} → {trip.endLocation}
      </Text>
      <View style={styles.additionalInfoSeatsContainer}>
        <Text style={styles.additionalInfoSeatsText}>Seats:</Text>
        <Text style={styles.additionalInfoSeatsValue}>{trip.seats}</Text>
      </View>
      <View style={styles.additionalInfoPriceContainer}>
        <Text style={styles.additionalInfoPriceText}>Price per seat:</Text>
        <Text style={styles.additionalInfoPriceValue}>{trip.price} DA</Text>
      </View>
    </View>
  );

  const renderUpcomingTrips = () => (
    <>
      {upcomingTrips.map((trip, index) => (
        <View key={index}>{renderTripCard(trip)}</View>
      ))}
    </>
  );

  const renderCompletedTrips = () => (
    <>
      {completedTrips.map((trip, index) => (
        <View key={index}>{renderTripCard(trip)}</View>
      ))}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text style={styles.tabText}>Travelled</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "completed" && styles.activeTab]}
            onPress={() => setActiveTab("completed")}
          >
            <Text style={styles.tabText}>Published</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {activeTab === "upcoming"
          ? renderUpcomingTrips()
          : renderCompletedTrips()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bleu: {
    backgroundColor: "#2E86AB",
    height: 130,
    width: "100%",
    alignItems: "center",
    flexDirection: "column-reverse",
    padding: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#fff",
  },
  tabText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Bold",
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: "#F7F7F7",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  dateText: {
    color: "#2E86AB",
    fontFamily: "Bold",
    fontSize: 18,
    marginBottom: 5,
  },
  routeText: {
    color: "#121212",
    fontFamily: "Bold",
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "center",
  },
  tripRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  tripRowTime: {
    flexDirection: "row",
    marginBottom: 5,
  },
  tripTime: {
    marginLeft: 5,
    color: "#2E86AB",
    fontFamily: "Bold",
    fontSize: 20,
  },
  additionalInfoPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  additionalInfoPriceText: {
    color: "#121212",
    fontFamily: "Bold",
    fontSize: 20,
  },
  additionalInfoPriceValue: {
    color: "#2E86AB",
    fontFamily: "Bold",
    fontSize: 20,
  },
  additionalInfoSeatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  additionalInfoSeatsText: {
    color: "#121212",
    fontFamily: "Bold",
    fontSize: 20,
  },
  additionalInfoSeatsValue: {
    color: "#2E86AB",
    fontFamily: "Bold",
    fontSize: 20,
  },
});

export default Trips;
