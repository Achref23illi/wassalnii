import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts } from "expo-font";

const DateSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [markedDates, setMarkedDates] = useState({});
  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    Regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    SemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  useEffect(() => {
    let dates = {};
    for (
      let d = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
      d <= new Date();
      d.setDate(d.getDate() + 1)
    ) {
      const strDate = d.toISOString().split("T")[0];
      dates[strDate] = {
        customStyles: { text: { color: strDate < today ? "#ccc" : "#2E86AB" } },
      };
    }
    dates[today] = {
      customStyles: {
        container: {
          borderColor: "#2E86AB",
          borderWidth: 2,
        },
        text: {
          color: "#ffffff",
        },
      },
      selected: true,
      selectedColor: "#2E86AB",
    };
    setMarkedDates(dates);
  }, []);

  const onDayPress = (day) => {
    if (day.dateString < today) {
      return; // Don't allow selecting a day before today
    }
    setSelectedDate(day.dateString);

    // Clear previous selection, preserve the styles of past dates, and mark the selected day
    setMarkedDates((prev) => {
      let newMarkedDates = {};
      for (let date in prev) {
        if (date < today) {
          newMarkedDates[date] = prev[date]; // Preserve the styles of past dates
        }
      }
      newMarkedDates[day.dateString] = {
        selected: true,
        selectedColor: "#2E86AB",
      };
      return newMarkedDates;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginTop: 20 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>When are you going?</Text>
      </View>

      <CalendarList
        pastScrollRange={0}
        futureScrollRange={1}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={onDayPress}
        markingType={"custom"}
        markedDates={markedDates}
        theme={{
          calendarBackground: "white",
          textSectionTitleColor: "#2E86AB",
          monthTextColor: "#2E86AB",
          dayTextColor: "#2E86AB",
          todayTextColor: "#2E86AB",
          todayBackgroundColor: "#fff",
          arrowColor: "gray",
          textDayFontFamily: "SemiBold",
          textMonthFontFamily: "SemiBold",
        }}
      />

      {selectedDate && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("pickup", {
              date: selectedDate,
              pickupAddress: route.params.pickupAddress,
              destinationAddress: route.params.destinationAddress,
              seats: route.params.seats,
            })
          }
        >
          <FontAwesome5 name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      )}
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
    height: 120,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SemiBold",
    marginTop: 20,
    marginLeft: 20,
  },
  nextButton: {
    position: "absolute", // Position button in the bottom-right
    right: 20,
    bottom: 20,
    backgroundColor: "#2E86AB",
    padding: 20,
    borderRadius: 100, // Circular button
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DateSelection;
