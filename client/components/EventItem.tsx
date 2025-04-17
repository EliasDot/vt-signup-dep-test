import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {Event} from '../app/types/index';


export default function EventItem({ event }: { event: Event }) {
  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{event.e_name}</Text>

      <View style={styles.eventContentRow}>
        <Text>Datum: {event.e_date}</Text>
        <Text>Uhrzeit: {event.e_date}</Text>
      </View>

      <Text style={styles.locationText}>{event.e_location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 8,
  },
  eventContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});
