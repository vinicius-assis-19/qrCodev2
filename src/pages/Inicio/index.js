import React, {useState, useEffect, useContext, } from 'react';
import {View, Text, StyleSheet, FlatList, Alert, TextInput, Switch, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../context/auth';
import QRCode from 'react-native-qrcode-svg';
import Loading from '../../components/loading';
import Header from '../../components/header';
import NfcManager, {NfcTech, Ndef, nfcManager} from 'react-native-nfc-manager';

export default function Inicio(){        
    const {token, carregarUsuario, dados, linkUser} = useContext(AuthContext);
    const linkWeb = 'https://script.google.com/macros/s/AKfycbxzKIUECXKbU7cx7_gHvVgn2PWQCDPR1mqBwnkqhXu0iZmR4qAWfdnTqGnW9Da4FYJX/exec?'
    const linkInstagram = dados ? "instagram=https://www.instagram.com/" + dados.instagram : ''
    const linkFacebook = dados ? "&facebook=https://www.facebook.com/" + dados.facebook : ''
    const linkWhatsapp = dados ? "&whatsapp=https://api.whatsapp.com/send?phone=" + dados.whatsapp : ''
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(()=>{        
        NfcManager.start();
        carregarUsuario();
    }, []);

    async function writeNdef({type, value}) {
        let result = false;
      
        try {
          // STEP 1
          await NfcManager.requestTechnology(NfcTech.Ndef);
      
          const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);
      
          if (bytes) {
            await NfcManager.ndefHandler // STEP 2
              .writeNdefMessage(bytes); // STEP 3
            result = true;
          }
        } catch (ex) {
          console.warn(ex);
        } finally {
          // STEP 4
          NfcManager.cancelTechnologyRequest();
        }
      
        return result;
      }

    return(
        <View style={styles.containerPrincipal}>          
            {!dados ?             
                <Loading />            
                : 
                <>
                    <Header />
                    <View style={{ backgroundColor: 'blue', width: '100%', height: '15%' }}>
                    </View><View style={{ backgroundColor: 'white', flex: 1, width: '100%', height: '85%', alignItems: 'center', }}>
                        <View style={styles.containerImagem}>
                            {!dados.imagemPerfil ?
                                <Icon
                                    name="person-circle"
                                    style={{
                                        fontSize: 75
                                    }} />
                                :
                                <Image
                                    source={{ uri: dados.imagemPerfil }}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: 100
                                    }} />}
                        </View>
                        <View style={{ margin: 20 }}>
                            <Text style={{ fontSize: 30 }}>
                                {dados.nome}
                            </Text>
                        </View>
                        <View>
                            {!linkUser ? 
                            <Loading />
                            :
                            <QRCode
                                value={linkUser}
                                size={300} />
                            }
                        </View>
                        <TouchableOpacity onPress={()=>{writeNdef()}}>
                            <View style={{backgroundColor:"black"}}>
                                <Text style={{color: "white"}}>
                                    NFC
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ margin: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text>Social</Text>
                            </View>
                            <View>
                                <Switch
                                    onValueChange={toggleSwitch}
                                    value={isEnabled} />
                            </View>
                            <View>
                                <Text>Profissional</Text>
                            </View>
                        </View>

                    </View>
                </>   
            }       
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
        flexDirection: 'row',
        // width: 150,
        height: 100,
        //backgroundColor: 'grey',
        margin: 25,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    titulo:{
        fontSize:50,     
        color:"white",        
    }
});