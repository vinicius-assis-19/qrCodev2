import React, { useContext} from 'react';
import firebase from '../services/firebaseConnection'
import {
    Alert,    
} from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import AuthContext from '../context/auth';
import RNFetchBlob from 'rn-fetch-blob';

const getFoto = async()=>{
    const res = await ImageCropPicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        cropperToolbarTitle: "Editar foto",
        cropperToolbarColor: "white",
        cropperStatusBarColor: "black",
        cropperCircleOverlay: true
    }).catch(err => {
        if (Platform.OS === 'ios' && err.code === 'E_PERMISSION_MISSING')
            Alert.alert(
                'Sem permissão!',
                'Ative nas configurações a permissão para abrir a galeria.'
            )
        Alert.alert(JSON.stringify(err.message))
    })
    
    if (!res || typeof res !== 'object') return undefined  
    return res
    // return `data:${res.mime};base64,${res.data}`
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

const uploadTeste = async(foto) =>{
    
    const typeFoto = (foto.mime).substring(6)
  
    const Blob = RNFetchBlob.polyfill.Blob;
  
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  

    window.Blob = Blob;    
  
    const nomeImagem = 'imagemPerfil/' + ((new Date()).getTime()).toString()+'.'+typeFoto   
  
    let blobFile = RNFetchBlob.wrap(foto.path)    
  
    let urlFoto = await Blob
    .build(blobFile, {type: 'image/'+typeFoto})
    .then(async(blob)=>{        
        let urlFoto = await firebase.storage()
        .ref('images')
        .child(nomeImagem)
        .put(blob, {contentType: 'image/'+typeFoto})
        .then(async(snapshot)=>{            
            urlFoto = await firebase.storage().refFromURL("gs://"+ snapshot.metadata.bucket + "/" + snapshot.metadata.fullPath).getDownloadURL() 
            Alert.alert('Upload success')           
            return urlFoto
        }).catch(function(error) {
            Alert.alert('Upload failed:', error);
          });                
        return await urlFoto
    })                    
    return await urlFoto
}

export default {    
    getFoto,
    editarUsuario,
    uploadTeste
}