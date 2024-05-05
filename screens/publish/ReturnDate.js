import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const ReturnDate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    date: startDate,
    pickupTime,
    pickupAddress,
    destinationAddress,
    seats,
  } = route.params; // Get the start date and other parameters from navigation parameters
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    let dates = getDatesBetween(new Date(startDate), new Date(selectedDate));
    let markedDates = {};

    dates.forEach((date) => {
      markedDates[date] = {
        customStyles: {
          container: {
            backgroundColor: "#aed8ea",
          },
          text: {
            color: "#ffffff",
          },
        },
      };
    });

    markedDates[startDate] = {
      customStyles: {
        container: {
          backgroundColor: "#2E86AB",
        },
        text: {
          color: "#ffffff",
        },
      },
    };

    markedDates[selectedDate] = {
      customStyles: {
        container: {
          backgroundColor: "#2E86AB",
        },
        text: {
          color: "#ffffff",
        },
      },
    };

    setMarkedDates(markedDates);
  }, [selectedDate]);

  const onDayPress = (day) => {
    if (day.dateString < startDate) {
      return; // Don't allow selecting a day before the start date
    }
    setSelectedDate(day.dateString);
  };

  const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.bleu}>
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>When are you returning?</Text>
      </View>

      <CalendarList
        pastScrollRange={0}
        futureScrollRange={4} // Limit future scroll range to 3 months
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
        }}
      />

      {selectedDate && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("price", {
              returnDate: selectedDate,
              pickupTime: pickupTime,
              pickupAddress: pickupAddress,
              destinationAddress: destinationAddress,
              seats: seats,
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
    height: 100,
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

export default ReturnDate;
