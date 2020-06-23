import React, { useState} from 'react';
import {View, TouchableOpacity, TextInput, Text, AsyncStorage} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

export default function config(){
  const navigation = useNavigation();
  const [end_server, setServer] = useState('');
  const [id_empresa, setEmpresa] = useState('');

  async function salvar(){
    await AsyncStorage.multiSet([
      ['@katarinaMobile:end_server',end_server],
      ['@katarinaMobile:id_empresa',id_empresa],
    ]);
    navigation.goBack();
  }

  return(
    <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Configuração</Text>
            </View>
            <View style={styles.inputs}>
                <Text style={styles.title}>Id da empresa</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Ex.: 1'
                    value={id_empresa}
                    onChangeText={setEmpresa}
                    keyboardType={'numeric'}
                />
                <Text style={styles.title}>Endereço do servidor da API</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Ex.: 192.168.0.1'
                    value={end_server}
                    onChangeText={setServer}
                    keyboardType={'numeric'}
                />   
                <TouchableOpacity onPress={() => salvar()} style={styles.buttom}>
                    <Text style={styles.buttomText}>SALVAR</Text>
                </TouchableOpacity>  
            </View>      
    </View>
  );
};