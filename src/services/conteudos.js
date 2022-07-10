import React, { useContext} from 'react';
import firebase from '../services/firebaseConnection'
import {
    Alert,    
} from 'react-native'
import ImgToBase64 from 'react-native-image-base64';
import { getStorage } from 'firebase/storage';
import ImageCropPicker from 'react-native-image-crop-picker'
import AuthContext from '../context/auth';
import {Buffer} from 'buffer'
import storage from '@react-native-firebase/storage'

const exemploFirebase = async()=>{
    // if(foto){
    //     const storage = await firebase.storage()        
    //     const base64Data = new Buffer.from(foto.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    //     const type = "png"
    //     const nomeImagem = ((new Date()).getTime()).toString()        
    //     const imagemTeste = await storage.ref(nomeImagem).put(base64Data)
    // }
}

const getFoto = async()=>{
    const res = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        cropperToolbarTitle: "Editar foto",
        cropperToolbarColor: "black",
        cropperStatusBarColor: "black",
    }).catch(err => {
        if (Platform.OS === 'ios' && err.code === 'E_PERMISSION_MISSING')
            Alert.alert(
                'Sem permissão!',
                'Ative nas configurações a permissão para abrir a galeria.'
            )
    })
    if (!res || typeof res !== 'object') return undefined      
    console.log(res)  
    return res
    return `data:${res.mime};base64,${res.data}`
}

const editarUsuario = async(verUsuario, linkInstagram, linkFacebook, linkWhatsapp)=>{
    const {user} = useContext(AuthContext)
    await firebase.database().ref('usuario')
    .child(user.uid)            
    .update({
        nome: verUsuario,
        instagram: linkInstagram,
        facebook: linkFacebook,
        whatsapp: linkWhatsapp
    })
    Alert.alert("Dados alterados com sucesso")
}

const upload = async (file) => {
    // await insertFotoTeste(JSON.stringify({base64Image: file}))    
    insertFotoTeste(file)
}

const uploadTeste = async(foto) =>{
    const nomeImagem = 'imagemPerfil/' + ((new Date()).getTime()).toString()                    
    const teste123 = await storage().ref(nomeImagem + '.' + type).putFile(foto)
    console.log(teste123)
}

const insertFotoTeste = async(foto)=>{
    
    // console.log(foto)
    // const fotoBuffer = new Buffer.from(foto.data)
    // console.log(fotoBuffer)
    // //   const base64Data = new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    // const imagemTeste = await ImgToBase64.getBase64String(foto.path)
    
    // if(fotoBuffer){
    //     const storage = firebase.storage()
    //     const type = "png"
    //     const nomeImagem = 'imagemPerfil/' + ((new Date()).getTime()).toString()                    
    //     const metadata = {
    //         contentType: 'image/' + type,  
    //     };           
    //     // const imagemTeste2 = await storage.ref(nomeImagem + '.' + type).put(fotoBuffer, metadata)
    //     return new Promise(() => {                         
    //         const imagemTeste3 = storage.ref(nomeImagem + '.' + type).putString(imagemTeste, 'base64', metadata).then(()=>{
                
    //         })
    //         console.log(imagemTeste3)
    //     })
        
    // }
}

export default {    
    getFoto,
    editarUsuario,
    upload,
    uploadTeste
}