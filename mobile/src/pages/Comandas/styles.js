import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'           
    },
    headerText:{
        fontSize: 25,
        color: '#808080',
        fontWeight: "bold",
        fontStyle: "italic"
    }, 
    search:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center' 
    },
    comandaList:{
        marginTop: 10
    },
    comanda:{
        padding:18,
        borderRadius:8,
        backgroundColor: '#fff',
        marginBottom:10, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'     
    },
    comandaTitle:{
        fontSize: 16,
        color: '#41414d',
        fontWeight: 'bold'
    },
    comandaValor:{
        fontSize:16,
        color: '#737380'  
    },
});