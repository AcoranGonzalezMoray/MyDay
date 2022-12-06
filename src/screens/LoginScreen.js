import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Keyboard,StatusBar, SafeAreaView} from 'react-native'
import { Text, Snackbar } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import auth from '@react-native-firebase/auth'


export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email:'',
    password:''
    });
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);
  const onToggleSnackBar2 = () => setVisible2(true);
  const onDismissSnackBar = () => setVisible(false);
  const onDismissSnackBar2 = () => setVisible2(false);

  const handle = (email, value)=>{
    if({email} != ''){
      setState({...state, [email]:value});
    }
  } ;

  const Login= async () => {
    if(state.email  != '' && state.password != ''){
      auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
  
          Keyboard.dismiss()
          onToggleSnackBar2();
        }
        if (error.code === 'auth/wrong-password') {
          Keyboard.dismiss()
          onToggleSnackBar();
        }
      })
    }

  
  }


  return (
    <View style={{flex:1, backgroundColor:'#00B386',}}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
    <Background >
      <Snackbar
        visible={visible2}
        onDismiss={onDismissSnackBar2}
        action={{
          label: 'Vale',
          onPress: () => {
            // Do something
          },
        }}>
        Error: El correo que has introducido no pertenece a ninguna cuenta. 
        Comprueba tu correo electrónico y vuelve a intentarlo.
      </Snackbar>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Vale',
          onPress: () => {
            // Do something
          },
        }}>
        Error: La contraseña que has introducido no pertenece a ninguna cuenta. 
        Comprueba tu contraseña y vuelve a intentarlo.
      </Snackbar>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bienvenido</Header>
      <TextInput
        label="Correo electrónico"
        minLength={10}
        onChangeText={(value) => handle("email", value)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        minLength={8}
        onChangeText={(value) => handle("password", value)}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>¿Has olvidado la contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button style={styles.container} mode="contained" onPress={() => Login()}>
        <Text >Iniciar sesión</Text>
      </Button>
      <View style={styles.row}>
        <Text style={styles.forgot}>¿No tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </View>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  container:{
    backgroundColor:'#00B386'
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.text,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
