import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
      },
    header:{
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#D3D3D3',
      height: 70
    },
    headerText:{
      fontSize: 30,
      fontWeight: 'bold',
      color: '#474A51',
      fontStyle: 'italic'
    },
    headerTextPed:{
      color: '#999999'
    },
    subHeader:{
      backgroundColor: '#000',
      height: 30,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 20
    },
    subHeaderText:{
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold'
    },
    rodape:{
      height: 50,
      paddingHorizontal: 20,
      backgroundColor: '#000',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'   
    },
    rodapeTex:{
      color: '#FFF',
      fontSize: 25,
      fontWeight: 'bold',
    },
    listItens:{
      marginTop: 5,
      marginBottom: 5,
    },
    itens:{
      paddingHorizontal: 20,
      backgroundColor: '#F2FDF2',
      marginBottom:2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    boxTitulo:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '45%',
    },
    itemTitle:{
      fontSize: 12,
      color: '#41414d',
      fontWeight: 'bold',
    },
    boxValor:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '50%'   
    },
    itemValor:{
      fontSize: 15,
      color: '#41414d', 
    },
    buttomAddItem:{
      height: 50,
      backgroundColor: '#FFA500',
      justifyContent: 'center',
      alignItems:'center'
    },
    titleButtomAddItem:{
      color: '#FFF',
      fontSize: 20,
      fontWeight: 'bold'
    }
  })