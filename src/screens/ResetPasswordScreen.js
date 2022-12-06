import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import auth from '@react-native-firebase/auth'
import {View, StatusBar} from  'react-native'
export default function ResetPasswordScreen({ navigation }) {

  const [state, setState] = useState({
    email:''
    });
  const handle = (email, value)=>{
    if({email} === ''){
      console.log('Vacio')
    }else{
    setState({...state, [email]:value});
    }
  } ;
  const ResetPassword= async () => {
    auth()
    .sendPasswordResetEmail(state.email)
  }
  return (
    <View style={{flex:1, backgroundColor:'#00B386'}}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restaurar contraseña</Header>
      <TextInput
        label="Correo electrónico"
        returnKeyType="done"
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        onChangeText={(value) => handle("email", value)}
        keyboardType="email-address"
        description="Recibiras en tu correo un link para restaurar la contraseña"
      />
      <Button
        mode="contained"
        style={{ marginTop: 16, backgroundColor:'#00B386' }}
        onPress={() => ResetPassword()}
      >
        Restaurar
      </Button>
    </Background>
    </View>
  )
}
