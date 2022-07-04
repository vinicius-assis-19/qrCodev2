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
import { awsCredential, awsCredentialConfig } from '../../awsConfig'
import AWS from 'aws-sdk'
import storage from '@react-native-firebase/storage'

const exemploAws = async()=>{
    return new Promise((resolve, reject) => {
        const s3 = new AWS.S3({
            apiVersion: '2012-08-10'
        })
        if(base64Image){
            const base64Data = new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = "png"
            s3.upload({
                ACL: "public-read",
                Bucket: "vendecfeed",
                Body: base64Data,
                Key: 'imagem-' + Date.now() + '.' + type,
                ContentEncoding: 'base64',
                ContentType: `image/${type}`
            }, (error, data) => {
                if (error)
                    reject(error, console.log('chegando erro'))
                else
                    resolve({ key: data.Key, url: data.Location })
            })
        }
    })
}

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

const base64Upload = async ctx =>
    ctx.body = await insertFotoS3(ctx.request.body.base64Image)

const insertFotoS3 = async(base64) =>{    
    const base64Image = await ImgToBase64.getBase64String(base64.path)
    const options =  awsCredential()    
    AWS.config.update({
        region: options.region,
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
        apiVersion: options.apiVersion,
        signatureVersion: options.signatureVersion
    })
    console.log(AWS.config)

    return new Promise((resolve, reject) => {        
        const s3 = new AWS.S3()
        if(base64Image){            
        //   const base64Data = new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
          console.log(base64Image)
          const type = "png"          
          s3.upload({
              ACL: "public-read",
              Bucket: "vendecfeed",
              Body: base64Image,
              Key: 'imagem-' + Date.now() + '.' + type,
              ContentEncoding: 'base64',
              ContentType: `image/${type}`
          }, (error, data) => {
              if (error)
                  reject(error, console.log('chegando erro'))
              else
                  resolve({ key: data.Key, url: data.Location })
          })
        }
      })
  }



export default {    
    getFoto,
    editarUsuario,
    upload,
    uploadTeste
}