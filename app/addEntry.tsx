import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";

export default function AddEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ photo?: string }>();
  const [mood, setMood] = useState(3);
  const [text, setText] = useState("");

  const handleSave = () => {
    console.log("Saving entry:", { photo: params.photo, mood, text });
    // Save entry logic here
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Neuer Eintrag</Text>
          
          <View style={styles.placeholder} />
        </View>

        {/* Photo Thumbnail */}
        {params.photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: params.photo }} style={styles.thumbnail} />
            <TouchableOpacity style={styles.changePhoto}>
              <Ionicons name="camera" size={20} color="#6A4FB6" />
            </TouchableOpacity>
          </View>
        )}

        {/* Mood Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stimmung</Text>
          <View style={styles.moodContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={mood}
              onValueChange={setMood}
              minimumTrackTintColor="#6A4FB6"
              maximumTrackTintColor="#E8DEF8"
              thumbTintColor="#6A4FB6"
            />
            <View style={styles.emojiLabels}>
              {['😢', '😕', '😐', '🙂', '😄'].map((emoji, index) => (
                <Text key={index} style={styles.emojiLabel}>
                  {emoji}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Text Area */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notizen</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Was ist heute passiert?"
            placeholderTextColor="#999"
            multiline
            numberOfLines={8}
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
          />
        </View>

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.detailText}>
              {new Date().toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.detailText}>
              {new Date().toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>Speichern</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  scrollView: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  backButton: {
    backgroundColor: "#6A4FB6",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1B1F",
  },

  placeholder: {
    width: 44,
  },

  photoContainer: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#fff",
    marginBottom: 8,
  },

  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },

  changePhoto: {
    position: "absolute",
    bottom: 34,
    right: "50%",
    marginRight: -110,
    backgroundColor: "#EDE0FF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  section: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1B1F",
    marginBottom: 16,
  },

  moodContainer: {
    paddingVertical: 8,
  },

  slider: {
    width: "100%",
    height: 40,
  },

  emojiLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 8,
  },

  emojiLabel: {
    fontSize: 28,
  },

  textArea: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1C1B1F",
    minHeight: 150,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },

  detailText: {
    fontSize: 16,
    color: "#666",
  },

  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },

  saveButton: {
    backgroundColor: "#6A4FB6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 24,
    gap: 8,
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
