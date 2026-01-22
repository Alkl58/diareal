import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const PlaceholderImage = require('@/assets/images/AI-logo.png');

export default function Login() {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={PlaceholderImage} style={styles.image} contentFit="contain"/>
            </View>

            <View style={styles.inputContainer}>
                <Input label="E-Mail" />

                <Button label="Send code" onPress={() => alert('Sending code!')}/>

                <Input label="Verification Code" />

                <Button label="Continue" onPress={() => router.push("/")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxHeight: 200,
    },
    image: {
        width: '50%', // adapt to screen width
        maxWidth: 200,
        aspectRatio: 1, // maintain square
        borderRadius: 20,
    },
    upperContainer: {
        width: '90%',
        maxWidth: 400, // optional: prevent stretching on desktop
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20, // spacing above/below
},

    inputContainer: {
        flex: 4,
        width: '90%',
        alignItems: 'center',
    },
});
