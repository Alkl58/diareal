import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DualButton from "@/components/ui/DualButton";

const PlaceholderImage = require('@/assets/images/icon.png');

export default function Login() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={PlaceholderImage} style={styles.image} />
            </View>

            <View style={styles.upperContainer}>
                <View style={styles.upperContainer}>
                    <DualButton
                        leftLabel="Register"
                        rightLabel="Login"
                        onLeftPress={() => router.push("/register")}
                        onRightPress={() => router.push("/(tabs)/login")}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Input label="Username" placeholderMessage="Enter your username"/>

                <Input label="Password" theme="password" />

                <Input label="PIN" placeholderMessage="Enter your PIN (optional)"/>

                <Button label="Register" onPress={() => router.push("/")} />
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

    imageContainer: {
        flex: 2,
        alignContent: 'center',
        justifyContent: 'center',
    },

    image: {
        borderRadius: 20,
        width: 200,
        height: 200,
    },

    upperContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },

    inputContainer: {
        flex: 4,
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
});