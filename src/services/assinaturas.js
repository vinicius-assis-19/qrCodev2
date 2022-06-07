import React, { useContext} from 'react';
import firebase from '../services/firebaseConnection'
import {
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const signIn = async(email, password) => {            
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async(value)=>{
        let user = value.user.uid        
        return user
        .then((snapshot) =>{
            let data = {
                uid: uid,
                nome: nome,
                email: snapshot.val().email
            };
            setUsuario(data);
            guardarUsuario(data);
        })
    })
    .catch((error)=>{
        let errorCode = error.code
        if(errorCode == "auth/invalid-email"){
            Alert.alert("Email inválido")
            return
        }        
        if(errorCode == "auth/wrong-password"){
            Alert.alert("Senha inválida")
            return
        }        
        if(errorCode == "auth/user-not-found"){
            Alert.alert("Email não localizado")
            return
        }        
        Alert.alert(errorCode)
        return error
    })    
    return user
}

const signUp = async(email, password, nome) =>{ 
    firebase.auth().createUserWithEmailAndPassword(email, password)    
    .then( async (value) =>{
        let uid = value.user.uid;
        await firebase.database().ref('usuario').child(uid).set({
            nome:nome,
            email: email,
        })
        .then((snapshot) =>{
            let data = {
                uid: uid,
                nome: nome,
                email: snapshot.val().email
            };
            setUsuario(data);
            guardarUsuario(data);
        })

    })
    .catch((error) => {
        let errorCode = error.code
        let errorMessage = error.errorMessage
    })
}

async function guardarUsuario(data){
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
}

export default {
    signIn,
    signUp,
    guardarUsuario,
}