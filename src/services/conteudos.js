import React, { useContext} from 'react';
import firebase from '../services/firebaseConnection'
import {
    Alert,
    PermissionsAndroid
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ImgToBase64 from 'react-native-image-base64';
// import { launchImageLibrary } from "react-native-image-picker";
import { getStorage } from 'firebase';
import SliderNativeComponent from 'react-native/Libraries/Components/Slider/SliderNativeComponent';
import ImageCropPicker from 'react-native-image-crop-picker'
import AuthContext from '../context/auth';

const getDados = async()=>{
    Alert.alert("batata")
}

const trocarFotoUsuario = () => {
    // const options = {
    //   noData: true,
    //   title: "Foto de avaliação",
    //   takePhotoButtonTitle: "Escolha uma foto",
    //   chooseFromLibraryButtonTitle: "Selecione da galeria uma foto",
    //   selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
    // };

    // launchImageLibrary(options, async (res) => {            
    //   if (res.didCancel) {
    //     Alert.alert("Usuário cancelou a seleção"); 
    //   } else {                         
    //     // ImgToBase64.getBase64String(JSON.stringify(res))
    //     // .then(base64String = async()=> {
    //     //     const response = await fetch({res})
    //     //     Alert.alert(response)
    //     //     const blob = await response.blob()
    //     //     storage = firebase.storage().ref()
    //     //     storage.put(blob).then((snapshot)=>{
    //     //         Alert.alert("mudou perfil")
    //     //     })
    //     // })
                
    //     Alert.alert(JSON.stringify(res))
    //     const response = await fetch(response)
    //     Alert.alert(JSON.stringify(response))
        

    //     storage = firebase.storage().ref()

    //     storage.put(blob).then((snapshot) => {
    //         console.log("Uploaded!");
    //       });
    //   }
    // })       
}

const getFoto = async()=>{
    const res = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        cropperToolbarTitle: "Editar foto",
        cropperToolbarColor: "white",
        cropperStatusBarColor: "black",
    }).catch(err => {
        if (Platform.OS === 'ios' && err.code === 'E_PERMISSION_MISSING')
            Alert.alert(
                'Sem permissão!',
                'Ative nas configurações a permissão para abrir a galeria.'
            )
    })
    if (!res || typeof res !== 'object') return undefined

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

export default{
    getDados,
    trocarFotoUsuario,
    getFoto,
    editarUsuario
}