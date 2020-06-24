import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Constants.statusBarHeight,  
    },
    header:{
        backgroundColor: '#D3D3D3',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#00A86B'
    },
    headerProd:{
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerProdText:{
        color: '#41414d',
        fontWeight: "bold",
        fontSize: 18,
    },
    infoProdTitle:{
        paddingHorizontal:10,
        height: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#737380',
    },
    infoProdText:{
        color: '#fff'
    },
    infoProdValue:{
        paddingHorizontal:10,
        height: 30,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
    },
    infoPordValueText:{
        color: '#41414d',
    },
    buttonsProdBox:{
        marginTop:10,
        marginBottom:10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal:10,     
    },
    buttonOpcional:{
        backgroundColor: '#FFA500',
        borderRadius:8,
        height: 35,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonAdd:{
         backgroundColor: '#00A86B',
         borderRadius:8,
         height: 35,
         width: '48%',
         justifyContent: 'center',
         alignItems: 'center'
    },
    buttonText:{
        fontSize: 16,
        fontWeight: "bold",
        color: '#fff'
    },
    headerPedList:{
        marginTop: 10,
        paddingHorizontal:10,
        height: 25,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#737380',   
    },
    headerPedListText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    pedListTitle:{
        paddingHorizontal:10,
        height: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
    },
    itensList:{
        marginTop: 9,
    },
    item:{
        padding:10,
        backgroundColor: '#fff',
        marginBottom:5,
    },
    itemText:{
        fontSize: 16,
        color: '#41414d', 
        fontWeight: "bold"
    },
    itemBox:{
        marginTop:3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemBoxText:{
        fontSize: 14,
        color: '#A0A0A0',         
    },
    vendaTotalBox:{
        paddingHorizontal:10,  
        height: 40, 
        justifyContent: 'center', 
        backgroundColor: '#41414d',
    },
    vendaTotalText:{
        fontWeight: "bold",
        fontSize: 20,
        color: '#fff'
    },
    botoesBox:{
        borderRadius:8,
        marginTop:5,
        marginBottom:5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:10,    
    },
    button:{
        backgroundColor: '#FFA500',
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
