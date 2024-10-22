import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal,FlatList } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";


type RouteDetailParams = {
    Order: {
        table: string | number;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
};

type ProductProps = {
    id: string;
    name: string;

};

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: number | string;
};

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps>();
    const [products, setProducts] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [modalProductVisible, setModalProductVisible] = useState(false);
    const [amount, setAmount] = useState('1');
    const [items, setItems] = useState<ItemProps[] | []>([]);

    const navigation = useNavigation <NativeStackNavigationProp<StackPramsList>>();
    async function handleCloseOrder() {
        try {
            api.delete('/order/delete', {
                params: {
                    order_id: route.params?.order_id
                }
            })
            navigation.goBack();
        } catch (error) {
            console.log(error)
        }

    }


    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item);
    }

    async function handleDeleteItem(item_id:string){
        await api.delete('order/removeItem',{
            params:{
                item_id: item_id
            }
        });

        let removedItem = items.filter(item =>{
            return(item.id !== item_id)
        })

        setItems(removedItem);

    }

    async function handleAddItem(item: ItemProps){
        const response = await api.post('/order/addItem',{
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })
        let data ={
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount

        }

        setItems(oldarray=>[...oldarray,data])
    }

    function handleFinishOrder(){
        navigation.navigate("FinishOrder")

    }

    useEffect(() => {
        async function getProduct() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })
            console.log("--------------------------------------------------")
            console.log("PRODUTOS DA CATEGORY", response.data)
            setProducts(response.data);
            setProductSelected(response.data[0])
        }

        getProduct();
    }, [categorySelected])

    useEffect(() => {
        async function getCategory() {
            const response = await api.get('/category/list')
            console.log(response.data)
            setCategory(response.data);
            setCategorySelected(response.data[0])
        }

        getCategory();
    }, [])

    const route = useRoute<OrderRouteProps>();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.table}</Text>
              {items.length === 0 &&
              (  <TouchableOpacity>
                    <Feather name="trash-2" size={28} color='#ff3f4b' onPress={handleCloseOrder} />
                </TouchableOpacity>)}
            </View>
            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: '#fff' }}>{categorySelected?.name}</Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{ color: '#fff' }}>{productSelected?.name}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    value={amount}
                    onChangeText={setAmount}
                    placeholderTextColor="#f0f0f0"
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.buttonText} >+</Text>
                </TouchableOpacity>
                {items.length !== 0
                    ? (
                        <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
                        <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>
                    )
                    : (
                        <TouchableOpacity style={[styles.button, {opacity: 0.3}]} disabled>
                        <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <FlatList
            showsVerticalScrollIndicator={false}
            style={{flex:1, marginTop:24,}}
            data={items}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=><ListItem data={item} deleteItem={handleDeleteItem}/>}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPicker handleCloseModal={() => setModalCategoryVisible(false)} options={category} selectedItem={handleChangeCategory} />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >
                <ModalPicker handleCloseModal={() => setModalProductVisible(false)} options={products} selectedItem={handleChangeProduct} />
            </Modal>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14
    },
    input: {
        backgroundColor: "#101026",
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20,
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: 40
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        height: 40,
        width: '75%',
    },
})