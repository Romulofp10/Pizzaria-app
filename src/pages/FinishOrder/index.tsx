import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons'
import { api } from "../../services/api";
import { useRoute,useNavigation,RouteProp} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

type RouteDetailParams={
    FinishOrder:{
        table: string| number;
        order_id: string;
    }
}

type FinishOrderRouteProp= RouteProp<RouteDetailParams,'FinishOrder'>

export function FinishOrder(){

    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    async function handleFinish(){
        try {
            await api.put('/order/send',{
                order_id: route.params?.order_id
            })
            navigation.popToTop();
        } catch (error) {
            console.log("ERRO AO FINALIZAR")
        }
        navigation.popToTop();
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Voce deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.table}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar Pedido</Text>
                <Feather size={20} name="shopping-cart" color="#1d1d2e"/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#1d1d2e",
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    alert:{
        fontSize:20,
        color:'#fff',
        fontWeight:'bold',
        marginBottom:12,
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color: '#fff',
        marginBottom:12,

    },
    button:{
        backgroundColor: '#3fffa3',
        flexDirection:'row',
        width:'65%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4,
    },
    textButton:{
        fontSize:18,
        marginRight:8,
        fontWeight:"bold",
        color:'#1d1d2e'
    }
})