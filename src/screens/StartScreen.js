import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function StartScreen({ navigation }) {
  changeNavigationBarColor('#121212')
  return (
    <View style={{flex:1,backgroundColor:'#191919', }}>
      <StatusBar  barStyle={'light-content'} translucent backgroundColor="transparent" />
      <View style={{flex:1, backgroundColor:'#191919'}}></View>
      <View style={{flex:5, borderWidth:1,borderTopStartRadius:60, borderTopEndRadius:60,  backgroundColor:'#00B386'}}>
      <Background >
      <Logo />
      <Header>Hola! Identificate</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        style={styles.container}
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Iniciar sesión
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={{color:'#00B386'}}>Regístrate</Text>
      </Button>
    </Background>
        
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#00B386',
  },
});