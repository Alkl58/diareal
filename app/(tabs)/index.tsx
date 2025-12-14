import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const entries = [
  {
    date: "03.01.2025",
    mood: "😊",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    visibility: "Privat",
    image: "https://placehold.co/600x300",
    taggedFriends: ['1'],
  },
  {
    date: "02.01.2025",
    mood: "😞",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    visibility: "Öffentlich",
    image: "https://placehold.co/600x300",
    taggedFriends: ['1', '2', '3'],
  },
  {
    date: "01.01.2025",
    mood: "😄",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    visibility: "Privat",
    image: "https://placehold.co/600x300",
    taggedFriends: ['1', '2'],
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Timeline</Text>
        {/* Date Select */}

        <TouchableOpacity
          style={styles.dateButton}
        >
          <Feather name="calendar" size={18} color="#6A4FB6" />
          <Text style={styles.dateText}>03.01.2025</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.timeline}>
        {entries.map((entry, index) => (
          <View key={index} style={styles.entry}>
            <View style={styles.entryHeader}>
              {/* Avatar */}
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={32} color="#6A4FB6" />
              </View>

              {/* Date + Visibility */}
              <View style={styles.entryCol}>
                <Text style={styles.entryDate}>{entry.date}</Text>
                <Text style={styles.entryVisibility}>{entry.visibility}</Text>
              </View>
            </View>
            <Image source={{ uri: entry.image }} style={styles.entryImage} />

            {/* Freunde Avatar + Mood Score */}
            <View style={styles.entryRowSpaceBetween}>
              <View style={styles.entryRowProfiles}>
                {entry.taggedFriends.map((friend) => (
                  <View key={friend} style={styles.avatarCircleSmall}>
                    <Ionicons name="person" size={16} color="#6A4FB6" />
                  </View>
                ))}
              </View>

              <Text style={styles.moodScore}>{entry.mood}</Text>
            </View>
            {/* Entry Text */}
            <Text style={styles.entryContent}>{entry.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingHorizontal: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  dateButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fdf7fe",
    padding: 10,
    height: 36,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: '#474747ff',
    shadowRadius: 2,
  },

  dateText: {
    color: "#6A4FB6",
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },

  timeline: {
    flex: 1,
  },

  entry: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#fdf7fe",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#6A4FB6",
    elevation: 5,
  },

  entryHeader: {
    flexDirection: "row",
    paddingBottom: 10,
  },

  entryCol: {
    flexDirection: "column",
    paddingLeft: 20,
    paddingTop: 3,
  },

  entryRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },

  entryRowProfiles: {
    flexDirection: "row", 
  },

  entryDate: {
    fontSize: 16,
    fontWeight: "600",
  },

  entryVisibility: {
    fontSize: 14,
    color: "#6A4FB6",
  },

  entryImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },

  entryContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },

  moodScore: {
    fontSize: 24,
    textAlign: "center",
  },

  slider: {
    position: "absolute",
    right: 10,
    bottom: 30,
    backgroundColor: "#EDE0FF",
    padding: 10,
    borderRadius: 50,
  },

  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 64,
    backgroundColor: "#EDE0FF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarCircleSmall: {
    width: 32,
    height: 32,
    borderRadius: 64,
    backgroundColor: "#EDE0FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
