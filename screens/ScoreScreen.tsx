import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';

import { AntDesign } from '@expo/vector-icons';
//Firebase
//import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, orderByChild, limitToLast, get, query, DataSnapshot } from 'firebase/database';
import { auth } from '../config/Config';

export default function ScoreScreen({ navigation }: any) {
    const [puntajes, setPuntajes] = useState([]);
    useEffect(() => {
        const db = getDatabase();
        const puntuacionRef = ref(db, 'puntuacion');
        const puntuacionQuery = query(puntuacionRef, orderByChild('puntuacion'), limitToLast(10));
        get(puntuacionQuery)
            .then((snapshot: DataSnapshot) => {
                if (snapshot && snapshot.exists()) {
                    const puntajesArray: [] = [];
                    snapshot.forEach((childSnapshot: { val: () => any; }) => {
                        console.log(childSnapshot)
                        const puntuacion: Puntuacion = childSnapshot.val();
                        puntajesArray.push(puntuacion);
                    });
                    setPuntajes(puntajesArray.reverse());
                }
            })
        //.catch(({error}:any) => {
        //    console.error('Error fetching data:', error);
        //});
    }, []);

    return (
        <ImageBackground
            source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.titleText}>Top 10 Puntajes</Text>

                    <FlatList
                        data={puntajes}
                        keyExtractor={(item) => item.nickE}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemText}>{item.nickE}</Text>
                                <Text style={styles.itemText}>{item.puntuacion}</Text>
                            </View>
                        )}
                    />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bienvenido')}>
                    <AntDesign name="logout" size={24} style={styles.icon} />
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
})