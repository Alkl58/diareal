import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#6A4FB6" />
      </TouchableOpacity>

      {/* General */}
      <View style={styles.section}>
        <SettingRow label="Restrict App Access" />
        <SettingRow label="Sync Device Light/Dark" />
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <SettingRow label="Receive Notifications" />
        <View style={styles.subsection}>
          <SettingRow label="Friend Request" />
          <SettingRow label="Daily Post Reminder" />
          <SettingRow label="Tagged in Post" />
        </View>
      </View>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#C0392B" />
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

/* Einzelne Zeile */
function SettingRow({ label }: { label: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "#EDE0FF",
    padding: 6,
    height: 44,
    borderRadius: 50,
  },

  section: {
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6",
    paddingVertical: 10,
    marginTop: 60,
    padding: 20,
  },

  subsection: {
    paddingLeft: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  rowText: {
    fontSize: 16,
  },

  deleteButton: {
    marginTop: "auto",
    marginBottom: 30,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FDEDEC",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
  },

  deleteText: {
    color: "#C0392B",
    fontSize: 16,
    fontWeight: "600",
  },
});
