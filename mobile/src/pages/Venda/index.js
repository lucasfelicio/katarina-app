import React, {useState,useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api';


export default function Produtos(){
    const route = useRoute();
    const id_venda = route.params.id_venda;
    const produto = route.params.produto;
    const [itens, setItens] = useState();

    async function loadItens(){
        //const response = await api.get('vendaitem',{params:{id_venda}});
        //setItens(response.data)
    }
    useEffect(()=>{
        loadItens();
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Pedido {id_venda}</Text>
            </View>            
            <View style={styles.headerProd}>
                <Text style={styles.headerProdText}>{produto.mat_003}</Text>
            </View>             
            <View style={styles.containerInfoProd}>
                <View style={styles.infoProdTitle}>
                    <Text style={styles.infoProdText}>Val. unit</Text>
                    <Text style={styles.infoProdText}>Qtd.</Text>
                    <Text style={styles.infoProdText}>Total Item</Text>
                </View>
                <View style={styles.infoProdValue}>
                    <Text style={styles.infoProdValueText}>{
                            Intl.NumberFormat('pt-BR',{
                            style: 'currency', 
                            currency: 'BRL',
                        }).format(produto.mat_008)}
                    </Text>
                    <Text style={styles.infoProdValueText}>1.00</Text>
                    <Text style={styles.infoProdValueText}>{
                            Intl.NumberFormat('pt-BR',{
                            style: 'currency', 
                            currency: 'BRL',
                        }).format(0.00)}</Text>
                </View>
            </View> 
            <View style={styles.buttonsProdBox}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>Adiconar</Text>
                </TouchableOpacity>
            </View>  
            <View style={styles.itemListBox}>
                <View style={styles.headerPedList}>
                    <Text style={styles.headerPedListText}>Itens do Pedido</Text>
                </View>              
            </View> 
            <FlatList
                data={itens}
                style={styles.itensList} 
                keyExtractor={vendaitem => String(vendaitem)}   
                showsVerticalScrollIndicator={false}
                renderItem={({item:vendaitem}) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{vendaitem.mat_003}</Text>
                        <View style={styles.itemBox}>
                            <Text style={styles.itemBoxText}>Quantidade: 1</Text>
                            <Text style={styles.itemBoxText}>Total item:{' '} 
                                {Intl.NumberFormat('pt-BR',{
                                    style: 'currency', 
                                    currency: 'BRL'
                                }).format(vendaitem.mat_008)}
                            </Text>
                        </View>
                    </View>
                )}                                
            /> 
            < View style={styles.vendaTotalBox}>
                <Text style={styles.vendaTotalText}>Total do Pedido: {' '}
                    {Intl.NumberFormat('pt-BR',{
                                style: 'currency', 
                                currency: 'BRL'
                    }).format(produto.mat_008)}
                </Text>                                
            </View> 

            <View style={styles.botoesBox}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {}}>
                    <Text style={styles.buttonText}>Novo item</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {}}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}