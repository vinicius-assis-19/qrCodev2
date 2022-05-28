import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../pages/login';
import Cadastro from '../pages/cadastro';

const Tab = createBottomTabNavigator();

const AuthRoutes = () => (
    <Tab.Navigator>    
        <Tab.Screen options={{tabBarVisible: false}} name="Login" component={Login} />
        <Tab.Screen options={{tabBarVisible: false}} name="Cadastro" component={Cadastro} />
    </Tab.Navigator>
);

export default AuthRoutes;