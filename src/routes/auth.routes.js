import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'

import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';

const Tab = createStackNavigator();

const AuthRoutes = () => (
    <Tab.Navigator>    
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Cadastro" component={Cadastro} />
    </Tab.Navigator>
);

export default AuthRoutes;