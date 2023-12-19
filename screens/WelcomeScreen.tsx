import { Alert, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, signOut } from "firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function WelcomeScreen({ navigation }: any) {
  function cerrarSesion() {
    Alert.alert('Advertencia', '¿Deseas cerrar la sesión?',
      [{ text: 'Cancelar', style: 'cancel' },
      {
        text: 'Aceptar', onPress: () => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              Alert.alert('Sesión Terminada');
              navigation.navigate('Inicio');
            })
            .catch((error) => {
              console.log(error)
            });
        },
      },],
      { cancelable: false }
    );
  }

  return (

    <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Bug Hunt</Text>
        <View>
          <Image source={require('../assets/images/splash.png')} style={styles.userImage} />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Juego')}>
          <MaterialCommunityIcons name='ladybug' size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Jugar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Puntuación')}>
          <MaterialCommunityIcons name='scoreboard-outline' size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Puntuación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => cerrarSesion()}>
          <AntDesign name='logout' size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
    padding: 15,
    borderRadius: 18,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 1,
    color: 'white'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10
  }
})