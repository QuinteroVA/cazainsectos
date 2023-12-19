import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
//import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig, db } from "../config/Config";
import { getDatabase, ref, set, onValue, orderByChild, limitToLast, query } from "firebase/database";
import { Modal } from "react-native";
import Ants from "../components/Ants";
//import { useFonts } from "expo-font";
//import Ants2 from "../components/Ants2";
//import { Audio } from 'expo-av'
// import { firebaseConfig } from '../components/Config';
export default function GameScreen({ navigation }:any) {
    const [tiempo, setTiempo] = useState(10);
    const [contador, setContador] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [antsCazados, setAntsCazados] = useState(0);
    const [nick, setNick] = useState(''); /////Borrar////
    const [ants, setAnts] = useState('');
    //const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

    useEffect(() => {
        const temporizador = setInterval(() => {
            setTiempo((tiempoAnterior) => {
                if (tiempoAnterior === 1) {
                    clearInterval(temporizador); //Detiene el temporizador
                }
                return tiempoAnterior - 1;
            });
        }, 1000); //Milésimas de un segundo
    }, []);

    useEffect(() => {
        if (tiempo === 0) {
            setAntsCazados(contador);
            setModalVisible(true);
            setTiempo(10);
            setContador(0);
        }
    }, [tiempo]);

    function contar() {
        setContador(contador + 1);
    }

    function guardar(nickE: string, antsE: string) {
        set(ref(db, 'jugadores/' + nick), {
            nick: nickE,
            patos: antsE,
        });
    }

    function puntuacion() {
        set(ref(db, 'puntuacion/' + nick), {
            nick: nick,
            puntaje: contador,
        });
    }

    function reiniciar() {
        navigation.navigate('Juego');
        setModalVisible(false);
        const temporizador = setInterval(() => {
            setTiempo((tiempoAnterior) => {
                if (tiempoAnterior === 1) {
                    clearInterval(temporizador); //Detiene el temporizador
                }
                return tiempoAnterior - 1;
            });
        }, 1000); //Milésimas de un segundo
    }

    function salir() {
        navigation.navigate('Bienvenido');
        setModalVisible(false);
        const temporizador = setInterval(() => {
            setTiempo((tiempoAnterior) => {
                if (tiempoAnterior === 1) {
                    clearInterval(temporizador);
                }
                return tiempoAnterior - 1;
            });
        }, 1000);
    }

    return (
        <View style={styles.container}>
            <ImageBackground
            source={{ uri: 'https://wallpapers.com/images/high/google-pixel-6-pro-1440-x-3120-wallpaper-qivh9jnft5bzjerh.webp' }}
            style={styles.backgroundImage}
        >
                <View style={styles.fila}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={require('../assets/images/ants_hunt_logo.png')} style={styles.imgT} />
                        <Text style={{ fontSize: 25, color: 'white' }}>  {contador}</Text>
                    </View>
                    <Text style={styles.time}>{tiempo}</Text>
                </View>
                <Ants presionar={contar} />
                {/*<Pato2 presionar={contar} />*/}
                <Modal visible={isModalVisible}
                    animationType='fade'
                    transparent={true}
                    style={styles.modalContainer}
                >
                    <View style={styles.modal}>
                        <Text>{'\n'}</Text>
                        <Text style={styles.txtR}>FIN DE LA PARTIDA</Text>
                        <Text></Text>
                        <Text style={styles.txtR}>Usted ha presionado: {antsCazados} hormigas</Text>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.btn} onPress={() => reiniciar()}>
                                <Text style={styles.txtBtn}>Reiniciar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => salir()}>
                                <Text style={styles.txtBtn}>Salir</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
    },
    btn: {

        height: 30,
        width: "30%",
        backgroundColor: "#008cff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "blue",
        margin: 10,
    },
    txtR: {
        color: "#008cff",
        fontSize:15
    },

    txtBtn: {
        color: "#fff",
    },
    modal: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        // flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "pixel",
    },
    imgT: {
        height: "90%",
        width: "29%",
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        height: "5%",
        width: "80%",
        borderRadius: 30,
        top: "5%"
    },
    time: {
        color: 'white',
        fontSize: 40,
    },
});
