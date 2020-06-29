import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import styles from './styles';
import api from '../../services/api';
import { Alert } from 'react-native';
export default function resumo() {
  const route = useRoute();
  const navigation = useNavigation();
  const id_venda = route.params.id_venda;
  const titulo = route.params.titulo;
  const valor_total = route.params.valor;
  const [venda, setVenda] = useState();
  const [vendaitens, setVendaitens] = useState();
  async function loadVenda() {
    await api.get('venda/resumo', { params: { id_venda, id_empresa: 1 } })
      .then((res) => {
        setVenda(res.data[0]);
        setVendaitens(res.data[1].vendaitens);
      })
      .catch((error) => {
        Alert.alert('Atenção', error.response.data.descricao)
      });
  };
  useEffect(() => {
    loadVenda();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={35} color={"#FFA500"} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{titulo}</Text>
        <Text style={styles.headerTextPed}>Nº Ped.{id_venda}</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Item</Text>
        <Text style={styles.subHeaderText}>Qtd.</Text>
        <Text style={styles.subHeaderText}>Val. Unit.</Text>
        <Text style={styles.subHeaderText}>Total</Text>
      </View>
      <FlatList
        style={styles.listItens}
        data={vendaitens}
        keyExtractor={item => String(item.ite_001)}
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
      >
      </FlatList>
      <View style={styles.rodape}>
        <Text style={styles.rodapeTex}>Total do Pedido</Text>
        <Text style={styles.rodapeTex}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(valor_total)}</Text>
      </View>
    </View>
  )
}


