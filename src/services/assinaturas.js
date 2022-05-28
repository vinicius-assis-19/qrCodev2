import React, { useContext} from 'react';
import firebase from '../services/firebaseConnection'
import {
    Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const signIn = async(email, password) => {        
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    try{        
        return user.user
    }catch{        
        let error = user.error     
    return error
    }
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