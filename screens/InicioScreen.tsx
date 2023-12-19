import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
    return (
        <ImageBackground
            source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.titleText}>BUG HUNT</Text>
                <View>
                    <Image
                        source={require('../assets/images/splash.png')}
                        style={styles.userImage}
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <AntDesign name="login" size={24} style={styles.icon} />
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registro')}>
                        <AntDesign name="adduser" size={24} style={styles.icon} />
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 50,
        color: '#008cff',
        fontWeight: 'bold'
    },
    userImage: {
        width: 200,
        height: 200,
    },
    button: {
        backgroundColor: '#008cff',
        height: 60,
        borderRadius: 50,
        margin: 10,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: "center",
    },
    icon: {
        marginRight: 5,
        color: 'white'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 5
    },
})