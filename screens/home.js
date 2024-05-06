import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

const HomePage = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [personCount, setPersonCount] = useState(1);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleInputFromPress = () => {
    navigation.navigate("pickUp");
  };

  const handleInputToPress = () => {
    navigation.navigate("drop");
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const getDateString = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString();
    }
  };

  const handlePersonCountChange = (value) => {
    setPersonCount(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location ? location.coords.latitude : 0,
          longitude: location ? location.coords.longitude : 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <Ionicons name="location-sharp" size={50} color="#2E86AB" />
          </Marker>
        )}
      </MapView>
      <View style={styles.topContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="disc-sharp" size={20} color="#2E86AB" />
          <TouchableOpacity onPress={handleInputFromPress} style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Pickup Location"
              editable={false}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="location" size={24} color="red" />
          <TouchableOpacity onPress={handleInputToPress} style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Drop Location"
              editable={false}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.datePersonContainer}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Ionicons name="calendar-outline" size={24} color="white" />
            <Text style={styles.dateText}>{getDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={styles.directionColumn}>
            <TouchableOpacity
              style={styles.personIcon}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="person-outline" size={24} color="#fff" />
              <Text style={{ color: "white" }}>{personCount}</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <TouchableOpacity
                      key={value}
                      style={styles.modalText}
                      onPress={() => handlePersonCountChange(value)}
                    >
                      <Text style={styles.modalText}>{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <Button title="Search" onPress={() => {}} color="#2E86AB" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  topContainer: {
    position: "absolute",
    bottom: 30,
    width: "85%",
    height: 250,
    zIndex: 1,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0.4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
  },
  datePersonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  directionColumn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 15,
    flex: 1,
  },
  personIcon: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E86AB", // change this to your preferred color
    borderRadius: 15, // change this to your preferred border radius
    padding: 8,
    paddingHorizontal: 15,
  },
  input: {
    borderBottomWidth: 0.2,
    borderBottomColor: "#ccc",
    flex: 1,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E86AB",
    padding: 10,
    borderRadius: 20,
  },
  dateText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomePage;
