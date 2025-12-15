import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Friend = {
  id: string;
  name: string;
  email: string;
  latestImage?: string;
};

const FRIENDS: Friend[] = [
  {
    id: "1",
    name: "Kevin Kunze",
    email: "kevin.kunze@example.com",
    latestImage: "https://picsum.photos/seed/kevin/200/200",
  },
  {
    id: "2",
    name: "Anna Kunze",
    email: "anna.kunze@example.com",
    latestImage: "https://picsum.photos/seed/anna/200/200",
  },
  {
    id: "3",
    name: "Siggi",
    email: "sigmar@example.com",
    latestImage: "https://picsum.photos/seed/siggi/200/200",
  },
];

export default function FriendsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.splitButton}>
          <TouchableOpacity style={styles.splitButtonLeft}>
            <Ionicons name="search" size={18} color="#fff" />
            <Text style={styles.splitButtonText}>Suche</Text>
          </TouchableOpacity>
          
          <View style={styles.splitButtonDivider} />
          
          <TouchableOpacity style={styles.splitButtonRight}>
            <Ionicons name="chevron-down" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Circle */}
      <View style={styles.profileCircle}>
        <Ionicons name="person" size={40} color="#6A4FB6" />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Freunde</Text>
      </View>

      {/* Friends List */}
      <FlatList
        data={FRIENDS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <View style={styles.friendCardContent}>
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
            </View>

            {/* Latest Image Thumbnail */}
            {item.latestImage && (
              <Image
                source={{ uri: item.latestImage }}
                style={styles.thumbnail}
              />
            )}
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

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#6A4FB6",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  splitButton: {
    flexDirection: "row",
    backgroundColor: "#6A4FB6",
    height: 44,
    borderRadius: 20,
    overflow: "hidden",
  },

  splitButtonLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 6,
  },

  splitButtonDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginVertical: 8,
  },

  splitButtonRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  splitButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EDE0FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: 'center',
  },

  friendCard: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#FAF7FF",
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
  },

  friendCardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 14,
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

  thumbnail: {
    width: 80,
    alignSelf: "stretch",
  },
});
