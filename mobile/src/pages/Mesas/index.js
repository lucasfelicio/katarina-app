import React, { useState, useEffect } from 'react';
import {
    View, FlatList, Text,
    TouchableOpacity, Alert, AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import ButtonsBox from '../../components/buttonsBox'
import styles from './styles';
import api from '../../services/api';
export default function Mesas() {
    const navigation = useNavigation();
    const [vendas, setVendas] = useState();
    const [num_mesa, setNumMesa] = useState(0);
    let id_venda = 0;
    async function loadVendas() {
        await api.get('venda', {
            params: { tipo: 'M', id_empresa: 1 }
        }).then(function (res) {
            setVendas(res.data);
        }).catch(function (error) {
            Alert.alert('Atenção', error.response.data.descricao)
        })
    };
    async function loadVenda() {
        api.get('venda',
            { params: { tipo: 'M', nro_com_mesa: num_mesa, id_empresa: 1 } })
            .then(function (res) {
                setVendas(res.data)
            }).catch(function (error) {
                Alert.alert('Atenção', error.response.data.descricao)
            })
    }
    async function abrirVenda() {
        const id_usuario = await AsyncStorage
            .getItem('@katarinaMobile:user_id');
        await api.post('venda',
            {
                tipo: 'M', nro_comanda: 0, nro_mesa: num_mesa, id_empresa: 1,
                header: `Authorization: ${id_usuario}`
            })
            .then(function (res) {
                id_venda = res.data;
            }).catch(function (error) {
                if (error) {
                    Alert.alert('Atenção', error.response.data.descricao)
                }
            })
    }
    function navigateToResumo(id_venda, valor, num_mesa) {
        navigation.navigate('Resumo',
            { id_venda, valor, titulo: 'Mesa ' + num_mesa }
        );
    }
    function navigationToCategorias() {
        abrirVenda();
        navigation.navigate('Categorias', { id_venda });
    }
    useEffect(() => {
        loadVendas();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mesas</Text>
                <TouchableOpacity onPress={() => navigationToCategorias()}>
                    <Feather name="plus-circle" size={35} color={"#FFA500"} />
                </TouchableOpacity>
            </View>
            <View style={styles.search}>
                <Input
                    style={styles.searchText}
                    placeholder="Nº Mesa"
                    returnKeyType='search'
                    keyboardType='numeric'
                    onChangeText={text => setNumMesa(text)}
                    onSubmitEditing={() => loadVenda()}
                    rightIcon={<Icon name='search' size={20} color='#dcdcdc' />}
                />
            </View>
            <FlatList
                style={styles.vendaList}
                data={vendas}
                keyExtractor={venda => String(venda.ven_001)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: venda }) => (
                    <TouchableOpacity
                        onPress={() => navigateToResumo(
                            venda.ven_001, venda.ven_009, venda.ven_026
                        )}
                    >
                        <View style={styles.venda}>
                            <Text
                                style={styles.vendaTitle}>
                                COMANDA {venda.ven_026}
                            </Text>
                            <Text style={styles.vendaValor}>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(venda.ven_009)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <ButtonsBox />
        </View>
    );
}


