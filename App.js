/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//**********************************BIBLIOTECA*********************************************** */
import React,{ useState, useEffect } from 'react';
import {
  useColorScheme
} from 'react-native';

import {Conexion_Auth} from './component/Auth'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'

import { createDrawerNavigator } from '@react-navigation/drawer';
import MyBottom from './component/bottom';
import  TermAndCondition from './component/TermAndCondition'
import { useTheme } from '@react-navigation/native';
import Privacy_Policy from './component/Privacy_Policy'
import category  from './component/Category';
import Ver_Post from './component/VerPost'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text , Switch} from 'react-native';
import { Divider, List } from 'react-native-paper';
import {darktheme, defaultheme} from './component/theme/colorThemes'
import { Provider} from 'react-native-paper'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from './src/screens'




//**********************************BIBLIOTECA*********************************************** */


const Drawerr = createDrawerNavigator();

const Stack = createStackNavigator()
//StatusBar.setBarStyle('light-content');




const signOut= async () =>{
  Conexion_Auth()
    .signOut()
}; 





function App(){
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();   
    
    const scheme = useColorScheme();
    const [islight, setislight] = useState('dark');
    const [isEnabled, setIsEnabled] = useState(false);
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      
      const subscriber = Conexion_Auth().onAuthStateChanged(onAuthStateChanged);
      setTimeout(()=>SplashScreen.hide(),1000)
      
      return subscriber; // unsubscribe on unmount
      
    }, []);


    if (initializing) return null;


    if (!user) {
      return (
        <Provider >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
            //mode="modal"
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      );
    }


    const Out = (props)=>{
      const { colors } = useTheme();
      
      const toggleSwitch= ()=> {
        setIsEnabled(previousState => !previousState)
        if(islight === 'light'){
          setislight('dark')
        }else{
          setislight('light')
        }
        
      }
      
      return(
        <View style={{flex:1}}>    
        <Text style={{fontSize:40, margin:10, color:colors.text, marginTop:StatusBar.currentHeight}}>
            Hola,{}
        </Text>
        
        <View  style={{flex:1, justifyContent:'center'}}>
        <Icon name="user-circle" size={70} color='gray'  style={{alignSelf:'center'}} />
        <Divider style={{backgroundColor: colors.divider, margin:5}}/>
        <List.Item
        style={{margin:10}}
        titleStyle={{color:colors.text}}
        title="Terminos y Condiciones"
        left={props => <List.Icon {...props} icon="book" style={{backgroundColor:colors.divider, borderRadius:20}}/>}
        onPress={() => {props.navigation.navigate('TermAndCondition')}}
        />
        <List.Item
        style={{ margin:10}}
        titleStyle={{color:colors.text}}
        title="Seguridad y Privacidad"
        left={props => <List.Icon {...props} icon="security"  style={{backgroundColor:colors.divider, borderRadius:20}} />}
        onPress={() => {props.navigation.navigate('Privacy_Policy')}}
        />
        </View>
        
        
        <View  style={{flex:1, justifyContent:'flex-end'}}>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        <Icon name="sign-out" size={18} color='#00B386'  style={{margin:15}} onPress={signOut} >Cerrar Sesión</Icon>
        </View>
        </View>
      )
      }
  return(

    <NavigationContainer theme={scheme === islight?   defaultheme : darktheme }>
      <Drawerr.Navigator
      initialRouteName="Home" 
      drawerContent={props=> <Out {...props} />}
      
      drawerStyle={{
    
        backgroundColor: islight=== 'light'?   'white' : '#121212',
        elevation:16,
      }}
    >
      <Drawerr.Screen name="Home" component={MyBottom} />
      <Drawerr.Screen name="TermAndCondition" component={TermAndCondition} />
      <Drawerr.Screen name="Privacy_Policy" component={Privacy_Policy} />
      <Drawerr.Screen name="Ver_Post" component={Ver_Post} />
      <Drawerr.Screen name="Category" component={category} />
    </Drawerr.Navigator>
    </NavigationContainer> 
  );

}


export default App;
