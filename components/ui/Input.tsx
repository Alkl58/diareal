import { StyleSheet, View, Text, TextInput } from "react-native";
import { moderateScale } from "react-native-size-matters";

type Probs = {
    label: string;
    theme?: 'password';
    placeholderMessage?: string;
}

export default function Input({ label, theme, placeholderMessage }: Probs) {
    if (theme === 'password') {
        return (
            <View style={styles.container}>
                <View style={styles.textLabelContainer}>
                    <Text style={styles.textLabel}>{label}</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="password" />
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.textLabelContainer}>
                <Text style={styles.textLabel}>{label}</Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput}
                    placeholder={placeholderMessage} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 400,
        height: 100,
        marginHorizontal: 20,
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },

    textInputContainer: {
        flex: 1,
        marginTop: 10,
    },

    textInput: {
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        height: '100%',
        fontSize: moderateScale(14),
    },

    textLabelContainer: {
        flex: 1 / 3,
    },

    textLabel: {
        fontSize: moderateScale(14),
        color: 'black',
    },
});