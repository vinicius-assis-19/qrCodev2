'use strict'
import React, {useState, useEffect, useContext, createContext} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,     
    Alert, 
    TextInput, 
    Switch, 
    Image,         
    ScrollView
} from 'react-native';
import firebase from '../../services/firebaseConnection';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../context/auth';
import conteudos from '../../services/conteudos'
import {Buffer} from 'buffer'
import { awsCredential, awsCredentialConfig } from '../../../awsConfig'
import AWS from 'aws-sdk'

export default function Configuracoes(){    
    const {token, carregarUsuario, dados, deslogando} = useContext(AuthContext)
    const [isEnabledInstagram, setIsEnabledInstagram] = useState(false);
    const [isEnabledFacebook, setIsEnabledFacebook] = useState(false);
    const [isEnabledWhatsapp, setIsEnabledWhasapp] = useState(false);
    const toggleSwitchInstagram = () => setIsEnabledInstagram(previousState => !previousState);    
    const toggleSwitchFacebook = () => setIsEnabledFacebook(previousState => !previousState);    
    const toggleSwitchWhatsapp = () => setIsEnabledWhasapp(previousState => !previousState);        
    let [dadosAlterados, setDadosAlterados] = useState(null)        
    const options = awsCredential()    
    
    AWS.config.update({
        region: options.region,
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
    })
        
    useEffect(()=>{               
        dadosParaAlterar();
    }, []);

    async function dadosParaAlterar(){
        dadosAlterados = {
            ...dados
        }
        setDadosAlterados(dadosAlterados)
    }

    async function editarUsuario(){        
        await firebase.database().ref('usuario')
        .child(token)            
        .update({
            nome: dadosAlterados.nome,
            instagram: dadosAlterados.instagram,
            facebook: dadosAlterados.facebook,
            whatsapp: dadosAlterados.whatsapp
        })
        Alert.alert("Dados alterados com sucesso")
    }

    const alterarFoto = async()=>{                
        const foto = await conteudos.getFoto()          
        const up = await conteudos.uploadTeste(foto)
    }

    return(
        <View style={styles.containerPrincipal}>
            <ScrollView style={{backgroundColor: 'white'}}>
            <View style={{backgroundColor: 'blue', width: '100%', height:'15%'}}>              
            </View>                        
            <View style={{backgroundColor: 'white', flex: 1, width: '100%', height:'85%',  alignItems: 'center',}}>
                <View style={styles.containerImagem}>
                    {!dados.imagemPerfil ?
                        <Icon 
                            name="person-circle"
                            style={{
                                fontSize:75
                            }}                            
                        />
                        :
                        <Image
                            source={{uri: dados.imagemPerfil}}
                            style={{
                                height: "70%",
                                width: "70%"
                            }}                        
                        />
                    }      
                    <View style={{backgroundColor: 'black', borderRadius: 50, padding: 5}}>
                        <TouchableOpacity onPress={()=>alterarFoto()}>
                            <Icon name='camera-outline' size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{margin: 20}}>                    
                    <TextInput
                        style={{fontSize: 30}}
                        value = {dadosAlterados ? dadosAlterados.nome : ''}
                        onChangeText={text => setDadosAlterados(dadosAlterados={
                            ...dadosAlterados,
                            nome: text
                        })}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.containerLinks}>   
                        <View style={styles.containerIcons}>                     
                            <Icon name="logo-instagram" size={50}/>
                        </View>
                        <View style={styles.containerTitulo}>
                            <Text>Instagram</Text>  
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput
                                placeholder=' @'
                                value={dadosAlterados ? dadosAlterados.instagram : ''}
                                autoCapitalize='none'
                                onChangeText={text => setDadosAlterados(dadosAlterados={
                                    ...dadosAlterados,
                                    instagram: text
                                })}
                            />    
                        </View>   
                        <View style={styles.containerSwitch}>
                            <Switch
                                onValueChange={toggleSwitchInstagram}
                                value={isEnabledInstagram}
                            />    
                        </View>           
                    </View>
                    <View style={styles.containerLinks}>   
                        <View style={styles.containerIcons}>                     
                            <Icon name="md-logo-facebook" size={50}/>
                        </View>
                        <View style={styles.containerTitulo}>
                            <Text>Facebook</Text>  
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput
                                placeholder=' @'
                                value={dadosAlterados ?  dadosAlterados.facebook : ''}
                                autoCapitalize='none'
                                onChangeText={text => setDadosAlterados(dadosAlterados={
                                    ...dadosAlterados,
                                    facebook: text
                                })}
                            />    
                        </View>   
                        <View style={styles.containerSwitch}>
                            <Switch
                                onValueChange={toggleSwitchFacebook}
                                value={isEnabledFacebook}
                            />    
                        </View>           
                    </View>
                    <View style={styles.containerLinks}>   
                        <View style={styles.containerIcons}>                     
                            <Icon name="logo-whatsapp" size={50}/>
                        </View>
                        <View style={styles.containerTitulo}>
                            <Text>WhatsApp</Text>  
                        </View>
                        <View style={styles.containerInput}>
                            <TextInput
                                placeholder=' cel'
                                value={dadosAlterados ? dadosAlterados.whatsapp : ''}
                                onChangeText={text => setDadosAlterados(dadosAlterados={
                                    ...dadosAlterados,
                                    whatsapp: text
                                })}
                            />    
                        </View>   
                        <View style={styles.containerSwitch}>
                            <Switch
                                onValueChange={toggleSwitchWhatsapp}
                                value={isEnabledWhatsapp}
                            />    
                        </View>           
                    </View>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity onPress={() => editarUsuario()}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Salvar alterações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>            
            </ScrollView>
        </View>
    );
}

const styles=StyleSheet.create({
    containerPrincipal:{
        flex: 1,
    },
    container:{
        flex:1,
        alignItems:"center",        
    },

    containerImagem:{        
        borderRadius: 100,        
        alignItems:"center",
        justifyContent: 'center',
        width: 150,
        height: 150,
        marginTop: -75,
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 1,
    },

    containerLinks:{
        display: 'flex',
        flex: 1,
        // backgroundColor: "green",
        flexDirection: 'row',
        width: '100%',
        height: 100,
        //backgroundColor: 'grey',
        // margin: 25,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    containerIcons:{
        marginLeft: 30,
        width:'20%'
    },
    containerTitulo:{
        width: '20%'
    },
    containerInput:{
        width: '40%',
        marginLeft: '10%',
        borderBottomColor:'#000',
        borderBottomWidth: 1
    },
    containerSwitch:{
        width: '20%',
        marginRight: 30,        
    },
    titulo:{
        fontSize:50,     
        color:"white",        
    },
    containerBtn:{
        width: 300,
        height: 50,
        borderRadius: 50,        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'blue',        
        margin: 10
    },
});