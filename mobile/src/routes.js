import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Config from './pages/Configuracao';
import Comandas from './pages/Comandas';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='Login' component={Login} />
                <AppStack.Screen name='Configuracao' component={Config} />
                <AppStack.Screen name='Comandas' component={Comandas} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}