import React, { useContext, useState } from 'react'
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity, ActivityIndicator} from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'


export default function SingIn(){
    const {user,signIn,loadingAuth,error,setError} = useContext(AuthContext);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    async function handleLogin(){
        if(!email || !password){
            return setError('Preencha os campos');
        }
         await signIn({email,password})

    }

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/pizzaCafeLogo.png')}/>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='Digite Seu email' placeholderTextColor='#f0f0f0' value={email} onChangeText={setEmail}  />
                <TextInput style={styles.input} secureTextEntry={true} placeholder='Digite Sua senha' placeholderTextColor='#f0f0f0' onChangeText={setPassword} />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? <ActivityIndicator size={25} color='#fff' /> : <Text style={styles.buttonText}>Acessar</Text>}
                </TouchableOpacity>
                <Text style={styles.errorText}>{error}</Text>

            </View>
            <Text>Tela de Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        backgroundColor:'#1d1d2e',
    },
    logo:{
        width:'80%',
        marginBottom:5,
    },
    inputContainer:{
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:14

    },
    input:{
        width:'95%',
        height:40,
        backgroundColor:'#101026',
        marginBottom:12,
        borderRadius:4,
        paddingHorizontal:8,
        color: '#ffff'
    },
    button:{
        width:'95%',
        height:40,
        backgroundColor:'#3fffa3',
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        marginTop:5,
        marginVertical:5,
        fontSize:18,
        fontWeight:'bold',
        color:'#101026'
    },
    errorText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#b81414'
    }
})