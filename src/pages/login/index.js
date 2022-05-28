import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TextInput, 
    Keyboard, 
    Alert
} from 'react-native';
import AuthContext from '../../context/auth'

export default function Login(){   
    const navigation = useNavigation();
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const { signed, signIn, } = useContext(AuthContext);        

    return(
        <View style={styles.containerPrincipal}>
            <Text style={styles.txtTitulo}>QR Social</Text>
            <View style={{margin: 10}}>
                <TextInput
                    style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                    placeholder='usuario'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                    placeholder='senha'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />                             
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={styles.btnLogin} onPress={() => signIn(email, password)}>
                        <Text style={{color: "white", fontSize:18, fontWeight:'bold'}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', margin: 10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                        <Text>CRIAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPrincipal:{
        flex:1,        
        alignItems:"center",
        justifyContent:"center",
    },
    txtTitulo:{
        fontSize: 40,
        color: 'darkblue',
        fontWeight:'bold',
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
    btnLogin:{
        backgroundColor: "blue",
        color: "white",
    },
})