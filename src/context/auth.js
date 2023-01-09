import React, { createContext, useState, useEffect } from "react";
import {Alert} from 'react-native'
import assinaturas from '../services/assinaturas.js'
import AsyncStorage from "@react-native-community/async-storage";
import firebase from '../services/firebaseConnection';
import { useNavigation } from "@react-navigation/native";
import ImgToBase64 from 'react-native-image-base64';

const AuthContext = createContext({ signed: Boolean });

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [dados, setDados] = useState(null)
  // const linkWeb = 'https://script.google.com/macros/s/AKfycbxzKIUECXKbU7cx7_gHvVgn2PWQCDPR1mqBwnkqhXu0iZmR4qAWfdnTqGnW9Da4FYJX/exec?'
  const linkInstagram = dados ? "&instagram=https://www.instagram.com/" + dados.instagram : ''
  const linkFacebook = dados ? "&facebook=https://www.facebook.com/" + dados.facebook : ''
  const linkWhatsapp = dados ? "&whatsapp=https://api.whatsapp.com/send?phone=" + dados.whatsapp : ''
  const [linkUser, setLinkUser] = useState(null)
  const [linkWeb, setLinkWeb] = useState(null)
  const [ foto64, setFoto64] = useState(null)
  const navigation = useNavigation()

  useEffect(()=>{
    verificaToken();
    getEndWebPerfil();
    getPersonLink();
  })

  const verificaToken = async()=>{    
    // await AsyncStorage.removeItem('Auth_user')
    const token = await AsyncStorage.getItem('Auth_user');    
    if(token){setToken(token)}
  }
  
  async function signIn(email, password){    
    const response = await assinaturas.signIn(email, password);      
    guardarUsuario(response)    
  }

  async function signUp(email, password, nome){  
    const response = await assinaturas.signUp(email, password, nome);      
    // await guardarUsuario(response)    
  }

  async function deslogando(){
    await firebase.auth().signOut();
    await AsyncStorage.clear()
    .then( () =>{
        setToken(null)
    })
  }

  async function guardarUsuario(token){
    await AsyncStorage.setItem('Auth_user', token);    
    setToken(token)  
  } 

  async function getFotos(){
    ImgToBase64.getBase64String(dados.imagemPerfil)
    .then(base64String => console.log(base64String))
    .catch(err => console.log(err));
  }

  async function getPersonLink(){
    if(dados){
      let linkUser =dados ? (linkWeb + ("id=" + token)) : ''    
      setLinkUser(linkUser)
    }
  }

  async function getEndWebPerfil(){
    await firebase.database().ref('parametros')
    .child("endPerfil")            
    .on('value', (snapshot)=>{
        var endWeb = snapshot.val()
        setLinkWeb(endWeb)
    })
  }

  async function carregarUsuario(){
    await firebase.database().ref('usuario')
    .child(token)            
    .on('value', (snapshot)=>{
        var dadosBd = snapshot.val()
        var dados ={
            ...dadosBd
        }        
        setDados(dados)        
        setFoto64(dados.imagemPerfil)   
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!token, token, signIn, deslogando, guardarUsuario, dados, carregarUsuario, linkUser, getPersonLink, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;