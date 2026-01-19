import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Sticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  scale: number;
}

const AVAILABLE_EMOJIS = ["❤️", "🔥", "⭐", "🎉", "🎈", "🎁", "🕶️", "👑"];

interface DraggableStickerProps {
  sticker: Sticker;
  onUpdatePosition: (id: string, x: number, y: number) => void;
  onUpdateScale: (id: string, scale: number) => void;
  onRemove: (id: string) => void;
}

function DraggableSticker({ sticker, onUpdatePosition, onUpdateScale, onRemove }: DraggableStickerProps) {
  // Shared values - initialized once from props
  const translateX = useSharedValue(sticker.x);
  const translateY = useSharedValue(sticker.y);
  const scale = useSharedValue(sticker.scale);
  const savedScale = useSharedValue(sticker.scale);
  const baseScale = useSharedValue(sticker.scale);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  // Track the last committed values to avoid resetting from our own updates
  const lastCommittedScale = useRef(sticker.scale);
  const lastCommittedX = useRef(sticker.x);
  const lastCommittedY = useRef(sticker.y);

  // Sync props to shared values only on initial mount
  useEffect(() => {
    translateX.value = sticker.x;
    translateY.value = sticker.y;
    scale.value = sticker.scale;
    savedScale.value = sticker.scale;
    baseScale.value = sticker.scale;
    lastCommittedScale.current = sticker.scale;
    lastCommittedX.current = sticker.x;
    lastCommittedY.current = sticker.y;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Stable callback functions for runOnJS
  const handlePositionUpdate = (id: string, x: number, y: number) => {
    onUpdatePosition(id, x, y);
    lastCommittedX.current = x;
    lastCommittedY.current = y;
  };

  const handleScaleUpdate = (id: string, scaleValue: number) => {
    onUpdateScale(id, scaleValue);
    lastCommittedScale.current = scaleValue;
  };

  // Pan gesture for dragging
  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate((e) => {
      'worklet';
      translateX.value = contextX.value + e.translationX;
      translateY.value = contextY.value + e.translationY;
    })
    .onEnd(() => {
      'worklet';
      runOnJS(handlePositionUpdate)(sticker.id, translateX.value, translateY.value);
    });

  // Pinch gesture for scaling
  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      'worklet';
      // Capture the baseline scale at the start of this gesture
      baseScale.value = savedScale.value;
    })
    .onUpdate((e) => {
      'worklet';
      // e.scale is relative to gesture start (starts at 1.0)
      // baseScale.value is the scale when this gesture started
      const newScale = baseScale.value * e.scale;
      
      // Clamp to reasonable bounds
      scale.value = Math.max(0.5, Math.min(5, newScale));
    })
    .onEnd(() => {
      'worklet';
      // Save the final scale as the new baseline
      savedScale.value = scale.value;
      
      // Sync to React state with the final scale value
      runOnJS(handleScaleUpdate)(sticker.id, scale.value);
    });

  // Compose gestures: pan and pinch can happen simultaneously
  const stickerGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={stickerGesture}>
      <Animated.View style={[styles.stickerContainer, animatedStyle]}>
        <Text style={styles.stickerEmoji}>{sticker.emoji}</Text>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(sticker.id)}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close-circle" size={24} color="#FF4444" />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

export default function PhotoScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [stickerModalVisible, setStickerModalVisible] = useState(false);
  const [stickers, setStickers] = useState<Sticker[]>([]);

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

  const openStickerModal = () => {
    setStickerModalVisible(true);
  };

  const addSticker = (emoji: string) => {
    const newSticker: Sticker = {
      id: Date.now().toString(),
      emoji,
      x: SCREEN_WIDTH / 2 - 25,
      y: SCREEN_HEIGHT / 2 - 100,
      scale: 1,
    };
    setStickers([...stickers, newSticker]);
    setStickerModalVisible(false);
  };

  const removeSticker = (id: string) => {
    setStickers(stickers.filter((s) => s.id !== id));
  };

  const updateStickerPosition = (id: string, x: number, y: number) => {
    setStickers(stickers.map((s) => (s.id === id ? { ...s, x, y } : s)));
  };

  const updateStickerScale = (id: string, scale: number) => {
    setStickers(stickers.map((s) => (s.id === id ? { ...s, scale } : s)));
  };

  if (photo) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        
        {/* Render Stickers */}
        {stickers.map((sticker) => (
          <DraggableSticker
            key={sticker.id}
            sticker={sticker}
            onUpdatePosition={updateStickerPosition}
            onUpdateScale={updateStickerScale}
            onRemove={removeSticker}
          />
        ))}
        
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

          <TouchableOpacity style={styles.editButton} onPress={openStickerModal}>
            <MaterialIcons name="edit" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Bearbeiten</Text>
          </TouchableOpacity>
        </View>

        {/* Sticker Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={stickerModalVisible}
          onRequestClose={() => setStickerModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Sticker hinzufügen</Text>
                <TouchableOpacity onPress={() => setStickerModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#1C1B1F" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.emojiGrid}>
                {AVAILABLE_EMOJIS.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.emojiButton}
                    onPress={() => addSticker(emoji)}
                  >
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </GestureHandlerRootView>
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: "70%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1B1F",
  },

  emojiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },

  emojiButton: {
    width: 60,
    height: 60,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  emojiText: {
    fontSize: 32,
  },

  stickerContainer: {
    position: "absolute",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  stickerEmoji: {
    fontSize: 50,
  },

  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    elevation: 5,
  },
});
