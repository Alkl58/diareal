import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PhotoScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera" size={64} color="#6A4FB6" />
          <Text style={styles.permissionText}>
            Kamera-Zugriff benötigt
          </Text>
          <Text style={styles.permissionSubtext}>
            Um Fotos aufzunehmen, benötigen wir Zugriff auf deine Kamera
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Zugriff erlauben</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });
      if (result) {
        setPhoto(result.uri);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const savePhoto = () => {
    // Navigate to add entry screen with photo
    router.push({
      pathname: "/addEntry",
      params: { photo },
    });
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={retakePhoto}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
            <Ionicons name="camera-reverse" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Wiederholen</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={savePhoto}>
            <Ionicons name="checkmark" size={32} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.editButton} onPress={savePhoto}>
            <MaterialIcons name="edit" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Bearbeiten</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Top Right Actions */}
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons name="flash-off" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Bottom Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  permissionText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    color: "#1C1B1F",
  },

  permissionSubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 32,
  },

  permissionButton: {
    backgroundColor: "#6A4FB6",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
  },

  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  camera: {
    flex: 1,
  },

  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    zIndex: 10,
  },

  topActions: {
    position: "absolute",
    top: 60,
    right: 20,
    flexDirection: "row",
    gap: 12,
  },

  actionIcon: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  controls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 60,
  },

  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#6A4FB6",
  },

  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#6A4FB6",
  },

  flipButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  previewActions: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  retakeButton: {
    alignItems: "center",
    gap: 4,
  },

  saveButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#6A4FB6",
    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    alignItems: "center",
    gap: 4,
  },

  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
