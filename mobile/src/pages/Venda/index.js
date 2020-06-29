import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";
import { Input } from 'react-native-elements';
import UIStepper from 'react-native-ui-stepper';
import styles from './styles';
import api from '../../services/api';
export default function Produtos() {
    const route = useRoute();
    const id_venda = route.params.id_venda;
    const produto = route.params.produto;
    const [itens, setItens] = useState();
    const [venda, setVenda] = useState();
    const [obs, setObs] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [val_totalitem, setValTotalItem] = useState(0.00);
    async function loadItens() {
        await api.get('venda/resumo', { params: { id_venda, id_empresa: 1 } })
            .then(function (res) {
                setVenda(res.data[0]);
                setItens(res.data[1].vendaitens);
            })
    }
    function calculaTotalItem(quantidade) {
        setQuantidade(quantidade)
        setValTotalItem(produto.mat_008 * quantidade);
    }
    async function inserirItem() {
        calculaTotalItem(quantidade);
        await api.post('venda/item', {
            id_empresa: 1, id_venda, id_produto: produto.mat_001,
            quantidade, valor_unit: produto.mat_008, val_total: val_totalitem,
            observacao: obs, id_impressora: produto.mat_021
        }).then(function (res) {
            Alert.alert('Atenção', 'Produto inserido com sucesso!');
        }).catch(function (error) {
            Alert.alert('Atenção', error.response.data.descricao)
        })
    }
    useEffect(() => {
        calculaTotalItem(1);
        loadItens();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Pedido Nº {id_venda}</Text>
            </View>
            <View style={styles.itemHeaderTitle}>
                <Text style={styles.itemHeaderText}>{produto.mat_001} - {produto.mat_003}</Text>
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
                    <Text style={styles.infoItemText}>{quantidade}</Text>
                    <Text style={styles.infoItemText}>{
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(val_totalitem)}</Text>
                </View>
            </View>
            <View style={styles.containerAdd}>
                <View style={styles.containerQtd}>
                    <UIStepper
                        onValueChange={(value) => { calculaTotalItem(value) }}
                    />
                    <TouchableOpacity style={styles.buttonAdd}
                        onPress={() => inserirItem()}
                    >
                        <Text style={styles.buttonText}>Adiconar</Text>
                    </TouchableOpacity>
                </View>
                <Input
                    style={styles.obsText}
                    placeholder="Observações"
                    onChangeText={text => setObs(text)}
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
                renderItem={({ item: vitem }) => (
                    <View style={styles.itens}>
                        <View style={styles.boxTitulo}>
                            <Text style={styles.itemTitle}>
                                {vitem.ite_001} - {vitem.mat_003}
                            </Text>
                        </View>
                        <View style={styles.boxValor}>
                            <Text style={styles.itemValor}>
                                {Intl.NumberFormat().format(vitem.ite_002)}
                            </Text>
                            <Text style={styles.itemValor}>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(vitem.ite_003)}
                            </Text>
                            <Text style={styles.itemValor}>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(vitem.ite_005)}
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