import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 25,
        color: '#808080',
        fontWeight: "bold",
        fontStyle: "italic"
    },
    inputs: {
        marginTop: 50,
        padding: 10,
    },
    title: {
        fontSize: 18,
        color: "#808080",
        fontWeight: "bold"
    },
    input: {
        fontSize: 15,
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
});