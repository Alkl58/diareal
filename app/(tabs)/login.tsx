import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { Image } from "expo-image";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Image source={PlaceholderImage} style={styles.image}/>
            </View>
            <View style={styles.inputContainer}>
                <Input label="E-Mail"></Input>

                <Input label="Password" theme="password"></Input>

                <Button label="Login"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    image: {
        width: 200,
        height: 200,
    },

    upperContainer: {
        flex: 1/3,
        justifyContent: 'center',
        alignContent: 'center',
    },

    inputContainer: {
        flex: 2/3,
        alignItems: 'center',
    },

    textInput: {
        width: 320,
        height: 68,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        fontSize: 24,
    },

    buttonContainer: {
        width: 320, 
        height: 68,
        marginHorizontal: 0,
        marginVertical: 20,
        alignContent: 'center',
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
    },

    buttonIcon: {
        paddingRight: 8,
    },

    buttonLabel: {
        color: 'black',
        fontSize: 24,
    },
});