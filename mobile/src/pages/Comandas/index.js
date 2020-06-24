import React, {useState,useEffect} from 'react';
import {View,FlatList,Text,TouchableOpacity, Alert,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Feather } from "@expo/vector-icons"; 
import {useNavigation} from '@react-navigation/native';
import ButtonsBox from '../../components/buttonsBox'
import styles from './styles';
import api from '../../services/api';

export default function Comandas() {
    const navigation = useNavigation();
    const [comandas, setComandas] = useState();
    const [num_comanda, setNumComanda] = useState(0);    
    const [id_venda, setIdVenda] = useState(0);
    async function loadComandas(){
        try {
            const response = await api.get('venda',{
                params:{ tipo:'C', id_empresa:1}
            });
            setComandas(response.data);
        } catch (error) {
            Alert.alert('Atenção',error.response.data.descricao)            
        }
    };
    function loadResumo(id_venda){
        navigation.navigate('Resumo',{id_venda});
    }
    async function loadComanda(){
        try {
            const response = await api.get('venda',{params:{tipo:'C',nro_com_mesa:num_comanda,id_empresa:1}}) 
            setComandas(response.data)            
        } catch (error) {
            Alert.alert('Atenção',error.response.data.descricao)
        }
    }
    async function abrirComanda(){
        try {
            const id_usuario = await AsyncStorage.getItem('@katarinaMobile:user_id'); 
            const response = await api.post('venda',
                                {params:{tipo:'C',nro_comanda:101,nro_mesa:0,id_empresa:1},
                                headers:{'Authorization':`Bearer${id_usuario}`},})
            setIdVenda(response.data)                      
        } catch (error) {
            Alert.alert('Atenção',error.response.data.descricao)
        }
    }
    function navigationToCategorias(){
        //abrirComanda();
        navigation.navigate('Categorias',{id_venda});
    }
    useEffect(()=>{ 
        loadComandas();
    },[])
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Comandas</Text>
                <TouchableOpacity onPress={() => navigationToCategorias()}>
                    <Feather name="plus-circle" size={35} color={"#FFA500"}/>
                </TouchableOpacity>
            </View>
            <View style={styles.search}>
                <Input 
                    style={styles.searchText} 
                    placeholder = "Nº Comanda"
                    returnKeyType = 'search'
                    keyboardType = 'numeric'
                    onChangeText={text => setNumComanda(text)}
                    onSubmitEditing = {() => loadComanda()} 
                    rightIcon={<Icon name='search' size={20} color='#dcdcdc'/>}
                />
            </View>
            <FlatList 
                style={styles.comandaList}
                data={comandas}
                keyExtractor={comanda => String(comanda.ven_001)}
                showsVerticalScrollIndicator={false}
                renderItem={({item:comanda}) => (
                    <TouchableOpacity onPress={()=> loadResumo(comanda.ven_001)} >
                        <View style={styles.comanda}>
                        <Text style={styles.comandaTitle}>COMANDA {comanda.ven_026}</Text>
                            <Text style={styles.comandaValor}>
                                {Intl.NumberFormat('pt-BR',{
                                    style: 'currency', 
                                    currency: 'BRL'
                                }).format(comanda.ven_009)} 
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}            
            />
            <ButtonsBox/>
        </View>
    );
}


