import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Friend = {
  id: string;
  name: string;
  email: string;
};

const FRIENDS: Friend[] = [
  {
    id: "1",
    name: "Kevin Kunze",
    email: "kevin.kunze@example.com",
  },
  {
    id: "2",
    name: "Anna Kunze",
    email: "anna.kunze@example.com",
  },
  {
    id: "3",
    name: "Siggi",
    email: "sigmar@example.com",
  },
];

export default function FriendsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#6A4FB6" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Freunde</Text>
      </View>

      {/* Search Placeholder */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#777" />
        <Text style={styles.searchText}>Suche</Text>
      </View>

      {/* Friends List */}
      <FlatList
        data={FRIENDS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            {/* Avatar */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>

            {/* Info */}
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendMail}>{item.email}</Text>
            </View>

            {/* Placeholder Icons */}
            <View style={styles.actions}>
              <Ionicons name="heart-outline" size={20} color="#bbb" />
              <Ionicons name="settings-outline" size={20} color="#bbb" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 60,
    width: '100%',
    
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: 'center',
    width: '100%',
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 8,
  },

  searchText: {
    color: "#777",
    fontSize: 16,
  },

  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF7FF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E3D8FF",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6A4FB6",
  },

  friendInfo: {
    flex: 1,
    marginLeft: 12,
  },

  friendName: {
    fontSize: 16,
    fontWeight: "600",
  },

  friendMail: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },
});
