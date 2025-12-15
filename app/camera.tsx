import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

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
            Um QR-Codes zu scannen, benötigen wir Zugriff auf deine Kamera
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

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    console.log(`QR Code scanned: ${data}`);
    setTimeout(() => {
      router.back();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Scan Frame */}
        <View style={styles.scanArea}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
          <Text style={styles.scanText}>Freunde</Text>
        </View>

        {/* Bottom Info */}
        <View style={styles.bottomInfo}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              QR-Code scannen, um Freund hinzuzufügen
            </Text>
          </View>
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

  scanArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scanFrame: {
    width: 250,
    height: 250,
    position: "relative",
  },

  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: "#fff",
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },

  scanText: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },

  bottomInfo: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 40,
  },

  instructionContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
  },

  instructionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
});
