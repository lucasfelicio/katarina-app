import React, { useState, useEffect } from 'react';
import {
    View, FlatList, Text,
    TouchableOpacity, Alert, AsyncStorage, RefreshControl
} from 'react-native';
import { Input } from 'react-native-elements';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import ButtonsBox from '../../components/buttonsBox'
import styles from './styles';
import api from '../../services/api';
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
export default function Mesas() {
    const navigation = useNavigation();
    const [mesas, setMesas] = useState();
    const [num_mesa, setNumMesa] = useState(0);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadMesas();
        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);
    async function loadMesas() {
        await api.get('venda', {
            params: { tipo: 'M', id_empresa: 1 }
        }).then(function (res) {
            setMesas(res.data);
        }).catch(function (error) {
            Alert.alert('Atenção', error.response.data.descricao)
        })
    };
    async function loadMesa() {
        api.get('venda',
            { params: { tipo: 'M', nro_com_mesa: num_mesa, id_empresa: 1 } })
            .then(function (res) {
                setMesas(res.data)
            }).catch(function (error) {
                Alert.alert('Atenção', error.response.data.descricao)
            })
    }
    async function abrirMesa() {
        const id_usuario = await AsyncStorage
            .getItem('@katarinaMobile:user_id');
        await api.post('venda',
            {
                tipo: 'M', nro_comanda: 0, nro_mesa: num_mesa, id_empresa: 1, id_usuario
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
    function navigateToResumo(id_venda, valor, num_mesa) {
        navigation.navigate('Resumo',
            { id_venda, valor, titulo: 'Mesa ' + num_mesa }
        );
    }
    function showDialog() {
        setDialogVisible(true);
    };
    function handleCancelar() {
        setDialogVisible(false);
    }
    function handleConfirmar() {
        setDialogVisible(false);
        abrirMesa();
    }
    useEffect(() => {
        loadMesas();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mesas</Text>
                <TouchableOpacity onPress={() => showDialog()}>
                    <Feather name="plus-circle" size={35} color={"#FFA500"} />
                </TouchableOpacity>
            </View>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Qual mesa deseja abrir?</Dialog.Title>
                <Dialog.Input
                    placeholder='Nº Mesa'
                    keyboardType='numeric'
                    onChangeText={text => setNumMesa(text)}
                >
                </Dialog.Input>
                <Dialog.Button label="cancelar" onPress={() => handleCancelar()} />
                <Dialog.Button label="confirmar" onPress={() => handleConfirmar()} />
            </Dialog.Container>
            <View style={styles.search}>
                <Input
                    style={styles.searchText}
                    placeholder="Nº Mesa"
                    returnKeyType='search'
                    keyboardType='numeric'
                    onChangeText={text => setNumMesa(text)}
                    onSubmitEditing={() => loadMesa()}
                    rightIcon={<Icon name='search' size={20} color='#dcdcdc' />}
                />
            </View>
            <FlatList
                style={styles.List}
                data={mesas}
                keyExtractor={mesa => String(mesa.ven_001)}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item: mesa }) => (
                    <TouchableOpacity
                        onPress={() => navigateToResumo(
                            mesa.ven_001, mesa.ven_009, mesa.ven_025
                        )}
                    >
                        <View style={styles.mesa}>
                            <Text
                                style={styles.mesaTitle}>
                                MESA {mesa.ven_025}
                            </Text>
                            <Text style={styles.mesaValor}>
                                {Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(mesa.ven_009)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <ButtonsBox />
        </View>
    );
}


