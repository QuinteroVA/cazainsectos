import { View, Image, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface AntsProps {
    presionar: () => void;
}
export default function Ants({ presionar }: AntsProps) {
    const [posicion, setPosicion] = useState({ x: 0, y: 0 });
    const [imageSource, setImageSource] = useState(require('../assets/images/ants.gif'));
    const changeImage = () => {
        setImageSource(require('../assets/images/ant_clicked.png'));
        setTimeout(() => {
            setImageSource(require('../assets/images/ants.gif'));
        }, 1000);
    };
    function moverAnt() {
        const maxY = Dimensions.get('window').height;
        const randomY = Math.floor(Math.random() * maxY);
        setPosicion({ x: 0, y: randomY });
    }
    useEffect(() => {
        const interval = setInterval(() => {
            moverAnt();
        }, 1500);
    }, []);
    function compuesta() {
        moverAnt();
        presionar();
        changeImage();
    }
    return (
        <View
            style={{
                top: posicion.y,
                left: posicion.x,
                position: 'absolute',
                padding: 16,
            }}
        >
            <TouchableOpacity onPress={() => compuesta()}>
                <Image source={imageSource} style={styles.img} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    img: {
        width: 90,
        height: 90,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
