import { StyleSheet, View, Pressable, Text } from "react-native";

type Probs = {
    leftLabel: string;
    rightLabel: string;
    onLeftPress?: () => void;
    onRightPress?: () => void;
};

export default function DualButton({leftLabel, rightLabel, onLeftPress, onRightPress}: Probs){
    return (
        <View style={styles.dualButtonContainer}>
            <Pressable style={styles.leftButton} onPress={onLeftPress}>
                <Text style={styles.buttonLabel}>{leftLabel}</Text>
            </Pressable>
            <Pressable style={styles.rightButton} onPress={onRightPress}>
                <Text style={styles.buttonLabel}>{rightLabel}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    dualButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        padding: '10%',
        justifyContent: 'center',
    },

    leftButton: {
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'gold',
    },

    rightButton: {
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'silver',
    },

    buttonLabel: {
        color: 'black',
        fontSize: 18,
    },
});