import React from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import {Feather} from '@expo/vector-icons'

interface ItemProps{
    data:{
            id: string;
            product_id: string;
            name: string;
            amount: number | string;
    }
    deleteItem: (item_id: string) => void;
}

export function ListItem({data,deleteItem}:ItemProps){

 function handleDeleteItem(){
    deleteItem(data.id)
};

    return(
        <View style={styles.container}>
            <Text style={styles.item}>{data.name} - QTD: {data.amount}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color='#ff3f4b' size={25}/>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#101026',
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingVertical:12,
        marginBottom:12,
        paddingHorizontal:12,
        borderRadius:4,
        borderWidth:0.4,
        borderColor:'#w8a8a8a'
    },
    item:{
        color:'#fff'
    }
})