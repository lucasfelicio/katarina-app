import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import styles from './styles';
import { Input } from 'react-native-elements';
import api from '../../services/api';
export default function Produtos() {
    const route = useRoute();
    const id_venda = route.params.id_venda;
    const produto = route.params.produto;
    const [itens, setItens] = useState();

    async function loadItens() {
        //const response = await api.get('vendaitem',{params:{id_venda}});
        //setItens(response.data)
    }
    useEffect(() => {
        loadItens();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Pedido Nº {id_venda}</Text>
            </View>
            <View style={styles.itemTitle}>
                <Text style={styles.itemText}>{produto.mat_001} - {produto.mat_003}</Text>
            </View>
            <View style={styles.containerItem}>
                <View style={styles.infoItemHeader}>
                    <Text style={styles.infoItemText}>Val. unit</Text>
                    <Text style={styles.infoItemText}>Qtd.</Text>
                    <Text style={styles.infoItemText}>Total Item</Text>
                </View>
                <View style={styles.infoItemValor}>
                    <Text style={styles.infoItemText}>{
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(produto.mat_008)}
                    </Text>
                    <Text style={styles.infoItemText}>1.00</Text>
                    <Text style={styles.infoItemText}>{
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(0.00)}</Text>
                </View>
            </View>
            <View style={styles.containerAdd}>
                <View style={styles.containerQtd}>
                    <Feather name="minus-circle" size={30} color={"#000"} />
                    <Input
                        style={styles.qtdIput}
                        keyboardType='numeric'
                    />
                    <Feather name="plus-circle" size={30} color={"#000"} />
                    <TouchableOpacity style={styles.buttonAdd}>
                        <Text style={styles.buttonText}>Adiconar</Text>
                    </TouchableOpacity>
                </View>
                <Input
                    style={styles.obsText}
                    placeholder="Observações"
                />
            </View>
            <View style={styles.bannerLista}>
                <View style={styles.headerPedList}>
                    <Text style={styles.listaHeader}>Itens do Pedido</Text>
                </View>
            </View>
            <FlatList
                data={itens}
                style={styles.lista}
                keyExtractor={vendaitem => String(vendaitem)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: vendaitem }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{vendaitem.mat_003}</Text>
                        <View style={styles.itemBox}>
                            <Text style={styles.itemBoxText}>Quantidade: 1</Text>
                            <Text style={styles.itemBoxText}>Total item:{' '}
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(vendaitem.mat_008)}
                            </Text>
                        </View>
                    </View>
                )}
            />
            < View style={styles.bannerTotal}>
                <Text style={styles.totalHeader}>Total do Pedido</Text>
                <Text style={styles.totalHeader}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(produto.mat_008)}
                </Text>
            </View>
            <View style={styles.botoesBox}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { }}>
                    <Text style={styles.buttonText}>Novo item</Text>
                    <Feather name="plus" size={25} color={"#FFF"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { }}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                    <Feather name="x" size={25} color={"#FFF"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { }}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                    <Feather name="check" size={25} color={"#FFF"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}