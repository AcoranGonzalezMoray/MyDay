import React from 'react';
import Home from '../screens/homescrollinfinite';
import { useTheme } from '@react-navigation/native';
import Post from '../screens/post';
import Profile from '../screens/profile';
import IconRemix from './RemixIcon/IconRemix'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
    StyleSheet,
  } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

const MyBottom=()=> {
  const { colors } = useTheme();
  return (

<Tab.Navigator 
initialRouteName="Home" 
tabBarColor={colors.tabBarColor}
activeColor= {colors.activeColor}
inactiveColor= {colors.inactiveColor}
barStyle={ colors.container}

>
<Tab.Screen  
name="Home"

component={Home} 
options={{
 tabBarLabel: 'Inicio',
 tabBarIcon:({color})=>(
   <IconRemix name="home-5-fill" size={25} color={color} />
 )
}}
/>

<Tab.Screen 
name="Post" 
component={Post} 
options={{
 tabBarLabel: 'Publicar',
 tabBarIcon:({color})=>(
  <IconRemix name="add-box-fill" size={25} color={color} />
 )
}}
/>

{/* <Tab.Screen 
name="Search" 
component={Search} 
options={{
 tabBarLabel: 'Buscar',
 tabBarIcon:({color})=>(
  <IconRemix name="search-fill" size={25} color={color} />
 )
}}
/> */}

<Tab.Screen 
name="Profile" 
component={Profile} 
options={{
 tabBarLabel: 'Perfil',
 tabBarIcon:({color})=>(
  <IconRemix name="user-fill" size={25} color={color} />
 )
}}

/>

</Tab.Navigator>

  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor:'#121212',
      borderTopWidth: 0.2,
      borderTopColor:'gray',
      elevation:8,
      
      
    },
    input:{
      backgroundColor:'white', margin:20
    }, 
    touchable:{
      backgroundColor:'white', margin:20
    }
  });
export default MyBottom;