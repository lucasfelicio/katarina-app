import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export default function ButtonsBox() {
    const navigation = useNavigation();
    
    function navigationToComandas(){
        navigation.navigate('Comandas')
    }
    function navigationToMesas(){
        navigation.navigate('Mesas')
    }

    return(
        <View style={styles.botoesBox}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigationToComandas()}>
                <Text style={styles.buttonText}>COMANDAS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigationToMesas()}>
                <Text style={styles.buttonText}>MESAS</Text>
            </TouchableOpacity>
        </View>
    );
}






