import React, { useState } from 'react';
import {
    Image, View, TouchableOpacity, TextInput,
    Text, Alert, AsyncStorage
} from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function fLogin() {
    const navigation = useNavigation();
    const [login, setlogin] = useState();
    const [senha, setSenha] = useState();

    async function signIn() {
        await api.get('sessions', { params: { login, senha } })
            .then((res) => {
                user = res.data;
                navigation.navigate('Comandas');
            })
            .catch((error) => {
                Alert.alert('Atenção', error.response.data.descricao);
            })
        // await AsyncStorage.multiSet([
        //     ['@katarinaMobile:user_id',JSON.stringify(user.id)],
        //     ['@katarinaMobile:user_name',JSON.stringify(user.user_name)],
        // ]);
    }
    function navigationToConfig() {
        navigation.navigate('Configuracao');
    };
    return (
        <View style={styles.container}>
            <View style={styles.imageLogo}>
                <Image source={logoImg} />
            </View>
            <View style={styles.inputs}>
                <TextInput
                    style={styles.input}
                    keyboardType='visible-password'
                    placeholder='Usuário'
                    value={login}
                    onChangeText={setlogin}
                />
                <TextInput
                    style={styles.input}
                    name={'edtsenha'}
                    placeholder='Senha'
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => signIn()} style={styles.buttom}>
                    <Text style={styles.buttomText}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigationToConfig()} style={styles.settings}>
                    <Feather name="settings" size={35} color={"#FFA500"} />
                </TouchableOpacity>
            </View>
            <View style={styles.rodape}>
                <Text style={styles.tituloButtom}>v.1.0.0</Text>
            </View>
        </View>
    )
}

