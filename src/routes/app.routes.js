import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Inicio from '../pages/Inicio';
import Scanner from '../pages/Scanner';
import Configuracoes from '../pages/Configuracoes';

const Tab = createBottomTabNavigator();

const icons ={
  Inicio:{
    name: 'home-outline'
  },
  Scanner:{
    name: 'scan'
  },
  Configuracoes:{
    name: 'settings'
  }
};

const AppRoutes = () => (
    <Tab.Navigator     
      screenOptions={({route})=>({
        headerShown: false,                  
        tabBarIcon: ({color,size})=>{
          const{name} = icons[route.name];
          return<Icon name={name} color={color} size={size} />
        }            
      })}
    >      
      <Tab.Screen name="Inicio" component={Inicio} />      
      <Tab.Screen name="Configuracoes" component={Configuracoes} />     
    </Tab.Navigator>      
);

export default AppRoutes;
