import React, { createContext, useState } from "react";
import {Alert} from 'react-native'
import assinaturas from '../services/assinaturas.js'

const AuthContext = createContext({ signed: Boolean });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  
  async function signIn(email, password){    
    const response = await assinaturas.signIn(email, password);      
    setUser(response);
  }

  async function deslogando(){
    await firebase.auth().signOut();
    await AsyncStorage.clear()
    .then( () =>{
        setUsuario(null);
    })
  }

  async function guardarUsuario(data){
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
}


  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, deslogando, guardarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;