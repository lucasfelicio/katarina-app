import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Config from './pages/Configuracao';
import Comandas from './pages/Comandas';
import Mesas from './pages/Mesas';
import Categorias from './pages/Categorias';
import Produtos from './pages/Produtos';
import Venda from './pages/Venda';
import Resumo from './pages/ResumoVenda';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='Login' component={Login} />
                <AppStack.Screen name='Configuracao' component={Config} />
                <AppStack.Screen name='Comandas' component={Comandas} />
                <AppStack.Screen name='Mesas' component={Mesas} />
                <AppStack.Screen name='Categorias' component={Categorias} />
                <AppStack.Screen name='Produtos' component={Produtos} />
                <AppStack.Screen name='Venda' component={Venda} />
                <AppStack.Screen name='Resumo' component={Resumo} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}