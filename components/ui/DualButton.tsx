import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

type Props = {
  leftLabel: string;
  rightLabel: string;
  active: 'left' | 'right';
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

export default function DualButton({ leftLabel, rightLabel, active, onLeftPress, onRightPress }: Props) {
  const { width } = useWindowDimensions();

  // Height scaling: smaller on very wide screens
  const BASE_HEIGHT = 50; // mobile default
  const MAX_DESKTOP_HEIGHT = 50; // keep same or slightly smaller if desired
  const BUTTON_HEIGHT = Math.min(BASE_HEIGHT, MAX_DESKTOP_HEIGHT); // caps height
  const BORDER_RADIUS = BUTTON_HEIGHT / 2;

  return (
    <View style={[styles.container, { height: BUTTON_HEIGHT, borderRadius: BORDER_RADIUS }]}>
      <Pressable
        style={[
          styles.half,
          { 
            backgroundColor: active === 'left' ? '#6A4FB6' : '#6a4fb681', 
            borderTopLeftRadius: BORDER_RADIUS, 
            borderBottomLeftRadius: BORDER_RADIUS 
          },
        ]}
        onPress={onLeftPress}
      >
        <Text style={styles.label}>{leftLabel}</Text>
      </Pressable>

      <Pressable
        style={[
          styles.half,
          { 
            backgroundColor: active === 'right' ? '#6A4FB6' : '#6a4fb681', 
            borderTopRightRadius: BORDER_RADIUS, 
            borderBottomRightRadius: BORDER_RADIUS 
          },
        ]}
        onPress={onRightPress}
      >
        <Text style={styles.label}>{rightLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400, // prevent stretching on desktop
    alignSelf: 'center',
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
});
