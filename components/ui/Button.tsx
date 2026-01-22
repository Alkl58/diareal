import { StyleSheet, View, Pressable, Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

type Probs = {
    label: string;
    onPress?: () => void;
};

export default function Button({label, onPress}: Probs) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%', 
        maxWidth: 400,
        height: 68,
        marginHorizontal: 20,
        marginVertical: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },

    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'gold',
    },

    buttonIcon: {
        paddingRight: 8,
    },

    buttonLabel: {
        color: 'black',
        fontSize: moderateScale(14),
    },
});