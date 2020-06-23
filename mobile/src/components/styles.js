import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    botoesBox:{
        borderRadius:8,
        marginTop:10,
        marginBottom:10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button:{
        backgroundColor: '#FBAC18',
        borderRadius: 8,
        height: 45,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize: 16,
        fontWeight: "bold",
        color: '#fff'
    }
})