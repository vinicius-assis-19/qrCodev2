import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, FlatList, Alert, TextInput, Switch, Image} from 'react-native';
import firebase from '../../services/firebaseConnection';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../context/auth';
import QRCode from 'react-native-qrcode-svg';

export default function Inicio(){    
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [imagemPerfil, setImagemPerfil] = useState('');
    const [dados, setDados] = useState('');
    const {user} = useContext(AuthContext)
    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(()=>{        
        async function carregarUsuario(){
            await firebase.database().ref('usuario')
            .child(user.uid)            
            .on('value', (snapshot)=>{
                var nome = snapshot.child("nome").val();
                var imagemPerfil = snapshot.child("imagemPerfil").val();                
                setUsuario(nome)
                setImagemPerfil(imagemPerfil)
            })
        }
        carregarUsuario();
    }, []);

    
    return(
        <View style={styles.containerPrincipal}>
            <View style={{backgroundColor: 'blue', width: '100%', height:'15%'}}>              
            </View>            
            <View style={{backgroundColor: 'white', flex: 1, width: '100%', height:'85%',  alignItems: 'center',}}>
                <View style={styles.containerImagem}>
                    {!imagemPerfil ?
                        <Icon name="person-circle"/>
                        :
                        <Image
                            source={{uri: imagemPerfil}}
                            style={{
                                height: "70%",
                                width: "70%"
                            }}                        
                        />
                    }                    
                </View>
                <View style={{margin: 20}}>                    
                    <Text style={{fontSize: 30}}>
                        {usuario}
                    </Text>
                </View>
                <View>
                    <QRCode
                        // value={dados.instagram}                             
                        size={200}
                    />
                </View>
                {/* <View style={{margin: 40, flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
                    <View>
                        <Text>Social</Text>
                    </View>
                    <View>
                        <Switch
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />    
                    </View>
                    <View>
                        <Text>Profissional</Text>
                    </View>
                </View> */}
            </View>            
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