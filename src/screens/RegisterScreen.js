import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Keyboard, StatusBar } from 'react-native'
import { Text, Snackbar } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import auth from '@react-native-firebase/auth'
export default function RegisterScreen({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(true);
  const onDismissSnackBar = () => setVisible(false);
  const [state, setState] = useState({
    email:'',
    password:'',
    name:''
    });


    //añadimos su valor a medida que el usuario escriba
    const handle = (email, value)=>{
      setState({...state, [email]:value});
    } ;
    const singUp= async () => {
      if(state.email  != '' && state.password != '' && state.name != ''){
      auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then(()=>{

        auth().currentUser.updateProfile({
          displayName: state.name
        })

      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
  
          Keyboard.dismiss()
          onToggleSnackBar();
        }
      })

    }

    }
  return (
    <View style={{flex:1, backgroundColor:'#00B386'}}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
    <Background>
    <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Vale',
          onPress: () => {
            // Do something
          },
        }}>
        Error: El correo que has introducido no es válido.
      </Snackbar>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Crear una cuenta</Header>
      <TextInput
        minLength={10}
        label="Nombre de usuario"
        returnKeyType="next"
        onChangeText={(value) => handle("name", value)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        minLength={10}
        label="Correo electrónico"
        returnKeyType="next"
        onChangeText={(value) => handle("email", value)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        minLength={8}
        label="Contraseña {Longitud min:8}"
        returnKeyType="done"
        onChangeText={(value) => handle("password", value)}
        secureTextEntry
      />
      <Button
        style={styles.containerr}
        mode="contained"
        onPress={() => singUp()}
      >
        Siguiente
      </Button>
      <View style={styles.row}>
        <Text style={styles.forgot}>¿Tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  containerr:{
    backgroundColor:'#00B386',
    marginTop: 24
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgot:{
    color:'white'
  }
})
