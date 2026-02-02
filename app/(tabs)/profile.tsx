import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity> */}

      {/* Settings Button */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push("/settings")}
      >
        <Feather name="settings" size={18} color="#fff" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarCircle}>
        <Ionicons name="person" size={70} color="#6A4FB6" />
      </View>

      <Text style={styles.username}>Username</Text>

      {/* QR Code */}
      <Image
        source={{
          uri: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Placeholder",
        }}
        style={styles.qr}
      />

      {/* Friends */}
      <View style={styles.friendsRow}>
        <TouchableOpacity 
          style={styles.friendsButton}
          onPress={() => router.push("/friends")}
        >
          <Text style={styles.friendsText}>Freunde</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.plusCircle}
          onPress={() => router.push("/camera")}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 60,
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "#6A4FB6",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  settingsButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#6A4FB6",
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  settingsText: {
    color: "#fff",
    fontSize: 16,
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "#EDE0FF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  username: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "600",
  },

  qr: {
    marginTop: 30,
    width: 220,
    height: 220,
  },

  friendsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F0FF",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
  },

  friendsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    gap: 15,
  },

  friendsText: {
    fontSize: 20,
    textAlign: "center",
  },

  plusCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#6A4FB6",
    justifyContent: "center",
    alignItems: "center",
  },

  friendsDiv: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 40,
  },
});
