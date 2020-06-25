import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#A9A9A9',
        height: 70
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#474A51',
    },
    itemTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#D3D3D3'
    },
    itemText: {
        fontSize: 17,
        color: '#474A51',
    },
    containerItem: {
        marginBottom: 5
    },
    infoItemHeader: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoItemValor: {
        backgroundColor: '#D3D3D3',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoItemText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    containerAdd: {
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    containerQtd: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    qtdInput: {

    },
    bannerLista: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listaHeader: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    bannerTotal: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        height: 40
    },
    totalHeader: {
        color: '#FFF',
        fontSize: 25,
        fontWeight: 'bold'
    },
    botoesBox: {
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    button: {
        backgroundColor: '#FFA500',
        borderRadius: 8,
        height: 50,
        width: '32%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonAdd: {
        backgroundColor: '#50C878',
        borderRadius: 8,
        height: 30,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
})
