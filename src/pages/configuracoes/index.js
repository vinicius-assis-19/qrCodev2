import React, {useState, useEffect, useContext} from 'react';
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,     
    Alert, 
    TextInput, 
    Switch, 
    Image, 
    Platform
} from 'react-native';
import firebase from '../../services/firebaseConnection';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../context/auth';
import conteudos from '../../services/conteudos'

export default function Inicio(){
    const [dados, setDados] = useState('');
    const [verUsuario, setUsuario] = useState('');
    const [linkInstagram, setLinkInstagram] = useState('');
    const [linkFacebook, setLinkFacebook] = useState('');
    const [linkWhatsapp, setLinkWhatsapp] = useState('');
    const [imagemPerfil, setImagemPerfil] = useState('');
    const {user} = useContext(AuthContext)
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);    

    useEffect(()=>{        
        async function carregarUsuario(){
            await firebase.database().ref('usuario')
            .child(user.uid)            
            .on('value', (snapshot)=>{
                // var dados = snapshot.val();                
                var nome = snapshot.child("nome").val();    
                var instagram = snapshot.child("instagram").val();
                var facebook = snapshot.child("facebook").val();
                var whatsapp = snapshot.child("whatsapp").val();
                var imagemPerfil = snapshot.child("imagemPerfil").val();
                var nome = snapshot.child("nome").val();
                // setDados(dados)            
                setUsuario(nome)
                setImagemPerfil(imagemPerfil)
                setLinkInstagram(instagram)
                setLinkFacebook(facebook)
                setLinkWhatsapp(whatsapp)
                // setLinkWhatsapp(dados.whatsapp)
                // setLinkFacebook(dados.facebook)
            })
        }
        carregarUsuario();
    }, []);

    async function editarUsuario(verUsuario, linkInstagram, linkFacebook, linkWhatsapp){
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

    return(
        <View style={styles.containerPrincipal}>
            <View style={{backgroundColor: 'blue', width: '100%', height:'15%'}}>              
            </View>            
            <View style={{backgroundColor: 'white', flex: 1, width: '100%', height:'85%',  alignItems: 'center',}}>
                <View style={styles.containerImagem}>
                    <Image
                        source={{uri: imagemPerfil}}
                        style={{
                            height: "70%",
                            width: "70%"
                        }}                        
                    />
                    <View style={{backgroundColor: 'black', borderRadius: 50, padding: 5}}>
                        <TouchableOpacity onPress={()=>conteudos.getFoto()}>
                            <Icon name='camera-outline' size={25} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{margin: 20}}>                    
                    <TextInput
                        style={{fontSize: 30}}
                        value = {verUsuario}
                        onChangeText={text => setUsuario(text)}
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
                                value={linkInstagram}
                                onChangeText={text => setLinkInstagram(text)}
                            />    
                        </View>   
                        <View style={styles.containerSwitch}>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isEnabled}
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
                                value={linkFacebook}
                                onChangeText={text => setLinkFacebook(text)}
                            />    
                        </View>   
                        <View style={styles.containerSwitch}>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isEnabled}
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
                                placeholder=' @'
                                value={linkWhatsapp}
                                onChangeText={text => setLinkWhatsapp(text)}
                            />    
                        </View>   
                        <View style={styles.containerSwitch}>
                            <Switch
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />    
                        </View>           
                    </View>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity onPress={() => conteudos.editarUsuario(verUsuario, linkInstagram, linkFacebook, linkWhatsapp)}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>Salvar alterações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        width: '40%'
    },
    containerSwitch:{
        width: '20%'
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