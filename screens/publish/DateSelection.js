import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const DateSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const onDayPress = (day) => {
    if (day.dateString < today) {
      return; // Don't allow selecting a day before today
    }
    setSelectedDate(day.dateString);
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
        <Text style={styles.headerText}>When are you going?</Text>
      </View>

      <CalendarList
        pastScrollRange={0}
        futureScrollRange={4} // Limit future scroll range to 3 months
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={onDayPress}
        markingType={"custom"}
        markedDates={{
          [selectedDate]: {
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
          },
        }}
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

export default DateSelection;
