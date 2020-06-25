import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight + 5,
    },
    inputs: {
        paddingTop: 5,
        padding: 10,
        justifyContent: "flex-start"
    },
    input: {
        fontSize: 18,
        marginTop: 15,
        padding: 3,
        borderRadius: 3,
        height: 45,
    },
    buttom: {
        backgroundColor: '#FFA500',
        borderRadius: 8,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttomText: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 17
    },
    imageLogo: {
        marginTop: 50,
        alignItems: "center"
    },
    rodape: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 230
    },
    tituloButtom: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "bold",
        color: '#808080'
    },
    settings: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})