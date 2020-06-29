import React, { useState, useEffect } from 'react';
import {
    View, FlatList, Text,
    TouchableOpacity, Alert, AsyncStorage
} from 'react-native';
import { Input } from 'react-native-elements';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import ButtonsBox from '../../components/buttonsBox'
import styles from './styles';
import api from '../../services/api';
export default function Comandas() {
    const navigation = useNavigation();
    const [comandas, setComandas] = useState();
    const [num_comanda, setNumComanda] = useState(0);
    const [dialogVisible, setDialogVisible] = useState(false)
    async function loadComandas() {
        await api.get('venda', {
            params: { tipo: 'C', id_empresa: 1 }
        }).then(function (res) {
            setComandas(res.data);
        }).catch(function (error) {
            Alert.alert('Atenção', error.response.data.descricao)
        })
    };
    async function loadComanda() {
        api.get('venda',
            { params: { tipo: 'C', nro_com_mesa: num_comanda, id_empresa: 1 } })
            .then(function (res) {
                setComandas(res.data)
            }).catch(function (error) {
                Alert.alert('Atenção', error.response.data.descricao)
            })
    }
    async function abrirComanda() {
        const id_usuario = await AsyncStorage
            .getItem('@katarinaMobile:user_id');
        await api.post('venda',
            {
                tipo: 'C', nro_comanda: num_comanda, nro_mesa: 0, id_empresa: 1,
            })
            .then(function (res) {
                console.log(res.data)
                navigation.navigate('Categorias', { id_venda: res.data });
            }).catch(function (error) {
                if (error) {
                    Alert.alert('Atenção', error.response.data.descricao)
                }
            })
    }
    function navigateToResumo(id_venda, valor, num_comanda) {
        navigation.navigate('Resumo',
            { id_venda, valor, titulo: 'Comanda ' + num_comanda }
        );
    }
    function showDialog() {
        setDialogVisible(true);
    };
    function handleConfirmar() {
        setDialogVisible(false);
        abrirComanda();
    }
    useEffect(() => {
        loadComandas();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Comandas</Text>
                <TouchableOpacity onPress={() => showDialog()}>
                    <Feather name="plus-circle" size={35} color={"#FFA500"} />
                </TouchableOpacity>
            </View>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Qual comanda deseja abrir?</Dialog.Title>
                <Dialog.Input
                    placeholder='Nº comanda'
                    keyboardType='numeric'
                    onChangeText={text => setNumComanda(text)}
                >
                </Dialog.Input>
                <Dialog.Button label="confirmar" onPress={() => handleConfirmar()} />
            </Dialog.Container>
            <View style={styles.search}>
                <Input
                    style={styles.searchText}
                    placeholder="Nº Comanda"
                    returnKeyType='search'
                    keyboardType='numeric'
                    onChangeText={text => setNumComanda(text)}
                    onSubmitEditing={() => loadComanda()}
                    rightIcon={<Icon name='search' size={20} color='#dcdcdc' />}
                />
            </View>
            <FlatList
                style={styles.comandaList}
                data={comandas}
                keyExtractor={comanda => String(comanda.ven_001)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: comanda }) => (
                    <TouchableOpacity
                        onPress={() => navigateToResumo(
                            comanda.ven_001, comanda.ven_009, comanda.ven_026
                        )}
                    >
                        <View style={styles.comanda}>
                            <Text
                                style={styles.comandaTitle}>
                                COMANDA {comanda.ven_026}
                            </Text>
                            <Text style={styles.comandaValor}>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(comanda.ven_009)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <ButtonsBox />
        </View>
    );
}


