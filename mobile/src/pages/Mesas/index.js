import React, {useState,useEffect} from 'react';
import {View,FlatList,Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Feather } from "@expo/vector-icons"; 
import {useNavigation} from '@react-navigation/native';
import ButtonsBox from '../../components/buttonsBox';
import styles from './styles';
import api from '../../services/api';

export default function Mesas() {
    const navigation = useNavigation();
    const [mesas, setMesas] = useState();
    const [num_mesa, setNumMesa] = useState();
    const [id_venda, setIdVenda] = useState(0);
    async function loadMesas(){
        try {
            const response = await api.get('venda',{params:{tipo:'M',id_empresa:1}});
            setMesas(response.data)           
        } catch (error) {
            Alert.alert('Atenção',error.response.data.descricao)
        }
    }
    async function loadMesa(){
        try {
            const response = await api.get('venda',{params:{tipo:'M',nro_com_mesa:num_comanda,id_empresa:1}}) 
            setComandas(response.data)            
        } catch (error) {
            Alert.alert('Atenção',error.response.data.descricao)
        }
    }
    async function abrirMesa(){
        try {
            const id_usuario = await AsyncStorage.getItem('@katarinaMobile:user_id');            
            const response = await api.post('venda',
                                {params:{tipo:'M',nro_comanda:0,nro_mesa:1,id_empresa:1},
                                headers:{'Authorization':`Bearer${id_usuario}`},})
            setIdVenda(response.data)                      
        } catch (error) {
            Alert.alert('Atenção',error.response.data.descricao)
        }
    }
    function navigationToCategorias(){
        //abrirMesa();
        navigation.navigate('Categorias',{id_venda});
    }   
    useEffect(()=>{
        loadMesas();
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mesas</Text>
                <TouchableOpacity onPress={() => navigationToCategorias()}>
                    <Feather name="plus-circle" size={35} color={"#FFA500"}/>
                </TouchableOpacity>
            </View>
            <View style={styles.search}>
                <Input 
                    style={styles.searchText} 
                    placeholder = "Nº Mesa"
                    returnKeyType ='search'
                    keyboardType = 'numeric'
                    onChangeText ={ text => setNumMesa(text)}
                    onSubmitEditing = {() => loadMesa()} 
                    rightIcon = {<Icon name='search' size={20} color='#dcdcdc'/>}
                />
            </View>
            <FlatList 
                data={mesas}
                style={styles.mesasList}
                showsVerticalScrollIndicator={false}
                keyExtractor={mesa => String(mesa.ven_001)}
                renderItem={({item:mesa}) => (
                    <TouchableOpacity onPress={()=>{}}>
                        <View style={styles.mesa}>
                    <Text style={styles.mesaTitle}>MESAS {mesa.ven_025}</Text>
                            <Text style={styles.mesaValor}>
                                {Intl.NumberFormat('pt-BR',{
                                    style: 'currency', 
                                    currency: 'BRL'
                                }).format(mesa.ven_009)} 
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}            
            />
            <ButtonsBox/>
        </View>
    );
}