{/*import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { auth, db } from '../config/Config';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export default function ScoreScreen({ navigation }: any) {
  const [puntajes, setPuntajes] = useState([]);
  useEffect(() => {
    cargarPuntuaciones();
  }, []);

  const cargarPuntuaciones = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      const puntuacionesRef = ref(db, 'puntuacion/');
      onValue(puntuacionesRef, (snapshot) => {
        const datos = snapshot.val();
        const puntuacionesArray = Object.values(datos);
        puntuacionesArray.sort((a, b) => b.hormigas - a.hormigas);
        const limite = puntuacionesArray.slice(0, 10);
        setPuntajes(limite);

      }
      
    )}
  )}



  const renderizarItem = ({ item }: any) => (
    <View>
      <Text>{`${item.usuario}: ${item.hormigas} hormigas`}</Text>
    </View>
  );




  return (
    <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
      style={styles.backgroundImage}
    >

      <View>
        <FlatList
          data={puntajes}
          renderItem={renderizarItem}
          keyExtractor={(item) => item.usuario}
        />
      </View>



      <View style={styles.container}>
        <Text style={styles.titleText}>Top 10 Puntajes</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bienvenido')}>
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
    fontSize: 50,
    color: '#008cff',
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemText: {
    fontSize: 15,
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
})*/}

import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, ref, orderByChild, limitToLast, get, query, DataSnapshot } from 'firebase/database';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth();

export default function ScoreScreen({ navigation }: any) {
  interface Puntuacion {
    usuario: string;
    hormigas: number;
  }
  const [loading, setLoading] = useState(true);
  const [puntajes, setPuntajes] = useState<Puntuacion[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        console.log('Usuario autenticado:', user.uid);
        cargarPuntajes();
      } else {
        console.log('Usuario no autenticado');
        setLoading(false);
      }
    }, (error) => {
      console.error('Error al obtener el estado de autenticación:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cargarPuntajes = () => {
    const db = getDatabase();
    const puntuacionRef = ref(db, 'puntuacion');
    const puntuacionQuery = query(puntuacionRef, orderByChild('hormigas'), limitToLast(10));

    get(puntuacionQuery)
      .then((snapshot: DataSnapshot) => {
        if (snapshot && snapshot.exists()) {
          const puntajesArray: Puntuacion[] = [];
          snapshot.forEach((childSnapshot: { val: () => any; }) => {
            const puntuacion: Puntuacion = childSnapshot.val();
            puntajesArray.push(puntuacion);
          });
          console.log('Datos recibidos:', puntajesArray);
          setPuntajes(puntajesArray.reverse());
        }
        setLoading(false);
      })
      .catch((error: any) => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#008cff" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Top 10 Puntajes</Text>

        <FlatList  style={styles.flatStyle}
          data={puntajes}
          keyExtractor={(item) => item.usuario}
          
          renderItem={({ item }) => (
            
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.usuario}</Text>
              <Text style={styles.itemText}>{item.hormigas}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bienvenido')}>
          <AntDesign name="logout" size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  flatStyle: {
    width: '40%', // Ocupar todo el ancho de la pantalla
    flexGrow: 0, // No permitir crecimiento adicional

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 40,
    color: '#008cff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#008cff',
    height: 60,
    borderRadius: 50,
    margin: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },

});