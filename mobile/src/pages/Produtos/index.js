import React, {useState,useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Feather} from "@expo/vector-icons"; 
import {useNavigation,useRoute} from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api';

export default function Produtos(){
    const navigation = useNavigation();
    const route = useRoute();
    const [produtos, setProdutos] = useState();
    const id_categoria = route.params.categoria.cat_001;
    const id_venda = route.params.id_venda;

    function navigationBack(){
        navigation.goBack()
    }
    function navigationToVenda(produto){
        navigation.navigate('Venda',{produto,id_venda})
    }
    async function loadProdutos(){
        const response = await api.get('produtos',{params:{id_categoria,id_empresa:1}});
        setProdutos(response.data)        
    }
    useEffect(()=>{
        loadProdutos();
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={35} color={"#FFA500"}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Voltar</Text>
            </View>
            <FlatList
                data={produtos}
                style={styles.produtoList}
                keyExtractor={produto => String(produto.mat_001)}
                showsVerticalScrollIndicator={false}      
                renderItem={({item:produto}) =>(
                    <TouchableOpacity onPress={() => navigationToVenda(produto)}>
                        <View style={styles.produto}>
                            <Text style={styles.produtoTitle}>{produto.mat_003}</Text>
                            <Text style={styles.produtoValor}>
                                {Intl.NumberFormat('pt-BR',{
                                    style: 'currency', 
                                    currency: 'BRL'
                                }).format(produto.mat_008)                               
                            }</Text>
                            <Feather name="arrow-right" size={25} color={"#FFA500"}/>
                        </View>                        
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}




