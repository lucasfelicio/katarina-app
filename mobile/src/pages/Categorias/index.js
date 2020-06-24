import React,{useState,useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Feather} from "@expo/vector-icons"; 
import {useNavigation, useRoute} from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api';

export default function Categorias(){
    const navigation = useNavigation();
    const route = useRoute();
    const [categorias, setCategorias] = useState([]);
    const id_venda = route.params.id_venda;

    function navigationBack(){
        navigation.goBack()
    }
    function navigationToProduto(categoria){
        navigation.navigate('Produtos',{categoria,id_venda})
    }
    async function loadCategorias(){   
        const response = await api.get('categorias', {params:{id_empresa:1}});
        setCategorias(response.data)
    }

    useEffect(()=>{
        loadCategorias();
    },[])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={35} color={"#FBAC18"}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Voltar</Text>
            </View>
            <FlatList
                data={categorias}
                style={styles.categoriaList}
                keyExtractor={categoria => String(categoria.cat_001)}
                showsVerticalScrollIndicator={false}      
                renderItem={({ item: categoria }) =>(
                    <TouchableOpacity onPress={() => navigationToProduto(categoria)}>
                        <View style={styles.categoria}>
                            <Text style={styles.categoriaTitle}>{categoria.cat_002}</Text>
                            <Feather name="arrow-right" size={25} color={"#FBAC18"}/>
                        </View>                        
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}




