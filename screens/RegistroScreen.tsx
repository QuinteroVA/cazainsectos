import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth, db } from '../config/Config';
import { ref, set } from "firebase/database";

export default function RegistroScreen({ navigation }: any) {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function registro() {
    
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        guardar(usuario, correo, user);
        Alert.alert('Registro Correcto')
        navigation.navigate('Login')
        setUsuario('')
        setCorreo('')
        setContrasenia('')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        switch (errorCode) {
          case 'auth/invalid-email':
            Alert.alert('Error', 'El correo o la contraseña no son válidos');
            break;
          case 'auth/missing-password':
            Alert.alert('Error', 'No se admite contraseña en blanco');
            break;
          case 'auth/email-already-in-use':
            Alert.alert('Error', 'Correo actualmente en uso');
            break;
          case 'auth/weak-password':
            Alert.alert('Error', 'Contraseña muy corta');
            break;
          default:
            Alert.alert('Error', 'Verificar credenciales');
            break;
        }
      }
      );
  }

  function guardar(usuario: string, correo: string, user: User) {
    set(ref(db, 'jugadores/' + user?.uid), {
      nick: usuario,
      email: correo,
    });
    setUsuario('')
    setCorreo('')
    setContrasenia('')
  }

  return (
    <ImageBackground
    source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <Text style={styles.titleText}>Registro</Text>
      <View>
      <TextInput
          placeholder='Ingresar usuario'
          style={styles.input}
          onChangeText={(texto) => (setUsuario(texto))}
        />
        <TextInput
          placeholder='Ingresar correo'
          style={styles.input}
          onChangeText={(texto) => (setCorreo(texto))}
          keyboardType='email-address'
        />
        <TextInput
          placeholder='Ingresar contraseña'
          style={styles.input}
          onChangeText={(texto) => (setContrasenia(texto))}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => registro()}>
        <AntDesign name="adduser" size={24} style={styles.icon}/>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate('Inicio')}>
          <AntDesign name="back" size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Regresar</Text>
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
    fontSize: 40,
    color:'#008cff',
    fontWeight:'bold'
  },
  input: {
    borderWidth: 2,
    borderColor:'#008cff',
    height: 40,
    marginVertical: 5,
    borderRadius: 30,
    paddingHorizontal: 25,
    fontSize:18,
    color:'black',
    fontWeight:'bold'
  },
  button: {
    backgroundColor: '#008cff',
    height: 60,
    borderRadius: 50,
    margin: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center'
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
});