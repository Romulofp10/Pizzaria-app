import { useContext, useState } from 'react'
import React from 'react-native'
import {View,Text,SafeAreaView,TouchableOpacity,TextInput,StyleSheet} from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { StackPramsList } from '../../routes/app.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { api } from '../../services/api'
export default function DashBoard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const [table,setTable] = useState('');
    const {signOut} =  useContext(AuthContext);
    

    async function openOrder(){
        if(!table){
            return
        }

        const response = await api.post('/order/create',{
            table: Number(table)
        })

        
        navigation.navigate('Order',{table:table, order_id: response.data.id })
        setTable('');
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>
            <TextInput 
            style={styles.input}
            keyboardType='numeric'
            placeholder='Número da mesa' 
            placeholderTextColor='#f0f0f0'
            onChangeText={setTable}
            />
            
            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:12,
        backgroundColor:'#1d1d2e'

    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:"#fff",
        marginBottom:24,

    },
    input:{
        width:'90%',
        height:60,
        backgroundColor:'#101026',
        borderRadius:4,
        paddingHorizontal:8,
        color:'#fff',
        textAlign:'center'

    },
    button:{
        width:'90%',
        height:40,
        backgroundColor: '#3fffa3',
        borderRadius:4,
        marginVertical:12,
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
})