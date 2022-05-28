import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRCodeScreen(){   
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>QR Code</Text>            

            <View style={styles.campoArea}>
            <QRCode
                value="https://web.whatsapp.com/951191798"     
                size={200}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,        
        alignItems:"center",
    },
    titulo:{
        fontSize: 30,
        color:"black",
    }, 
    campoArea:{
        flex: 1,
        width: '100%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        flexDirection:"row",
        alignItems:"center",
    },
    campoFilme:{
        marginRight:5,
        backgroundColor:"lightgrey",
        width:'80%',
        height:40,
    },
    btnArea:{
        backgroundColor:"grey",
    },
    btnTexto:{
        color:"white",
    }
});