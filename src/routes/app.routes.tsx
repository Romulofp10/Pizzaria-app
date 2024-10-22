import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashBoard from "../pages/Dashboard";
import Order from "../pages/Order";
import { FinishOrder } from "../pages/FinishOrder";

export type StackPramsList ={
    DashBoard: undefined;
    Order:{
        table: number | string;
        order_id: string;
    };
    FinishOrder: undefined;
}

const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes(){

    return(
        <Stack.Navigator>
            <Stack.Screen name="DashBoard" component={DashBoard} options={{headerShown:false}}/>
            <Stack.Screen name="Order" component={Order} options={{headerShown:false}}/>
            <Stack.Screen name="FinishOrder" component={FinishOrder} options={{headerShown:false, title:'Finalizando', headerStyle:{backgroundColor:'#1d1d2e'},headerTintColor:'#fff'}}/>
        </Stack.Navigator>
    )
}

export default AppRoutes