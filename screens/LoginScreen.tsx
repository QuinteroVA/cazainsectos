import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log(user.uid)
        Alert.alert('Sesión', 'Acceso Correcto')
        navigation.navigate('Tab_Welcome')
        setCorreo('')
        setContrasenia('')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'El correo o la contraseña no son válidos');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'No se admite contraseña en blanco');
            break;
          default:
            Alert.alert('Error', 'Verificar credenciales');
            break;
        }
      }
      );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Login</Text>
        <View>
          <TextInput
            placeholder='Ingrese correo'
            style={styles.input}
            onChangeText={(texto) => (setCorreo(texto))}
            keyboardType='email-address'
            value={correo}
          />
          <TextInput
            placeholder='Ingrese contraseña'
            style={styles.input}
            onChangeText={(texto) => (setContrasenia(texto))}
            value={contrasenia}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <AntDesign name='login' size={24} style={styles.icon} />
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate('Inicio')}>
          <AntDesign name='back' size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Regresar</Text>
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
  input: {
    borderWidth: 2,
    borderColor: '#008cff',
    height: 40,
    marginVertical: 5,
    borderRadius: 30,
    paddingHorizontal: 25,
    fontSize: 18,
    color: 'black',
    fontWeight:'bold'
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
