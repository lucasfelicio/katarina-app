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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '48%',
    },
    headerText:{
        fontSize: 20,
        color: '#737380',
        fontWeight: "bold"
    },
    categoriaList:{
        marginTop: 10
    },
    categoria:{
        padding:10,
        borderRadius:8,
        backgroundColor: '#fff',
        marginBottom:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'  
    },
    categoriaTitle:{
        fontSize: 16,
        color: '#41414d',
        fontWeight: 'bold',
        width: "90%"
    }
})