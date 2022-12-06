//**********************************BIBLIOTECA*********************************************** */
import React,  { useState} from 'react';
import {Conexion_Firestore} from '../component/Firestore'
import {Conexion_Auth} from '../component/Auth'
import IconRemix from '../component/RemixIcon/IconRemix'
import { Appbar, TextInput, Snackbar,List } from 'react-native-paper';
import {
  Button,
    Keyboard,
    StyleSheet,
    View,
    StatusBar
  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LogoBar } from '../src/components/Logo';
//*************************************************************************************************** */

const Post = (props, {navigation}) => {
  const input = React.createRef();
  const  { colors } = useTheme();
  let categoria = '';
//inicializamos valores
  const [state, setState] = useState({
      ADV:"",
  });
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);
//añadimos su valor a medida que el usuario escriba
  const handle = (ADV, value)=>{
    setState({...state, [ADV]:value});
  } ;

// añadir un nuevo documento 
  const AddNewADV = async () =>{
    if(state.ADV === '' | state.ADV.length<40 | categoria === ''){
      Keyboard.dismiss();
      onToggleSnackBar();
    }else{
      await Conexion_Firestore().collection('POST').add({
        ADV: state.ADV,
        User_id: Conexion_Auth().currentUser.uid,
        likeid:[],
        categoria:categoria,
        date:Conexion_Firestore.FieldValue.serverTimestamp(),
      })
      
      input.current.clear();
      props.navigation.navigate('Home')
      //rederigir =>  navigator({Home})

      
  }

  }

 return(
    <View  style={{flex:1, backgroundColor:colors.backgroundColor,}}>
      <StatusBar barStyle={colors.Barcontent} translucent backgroundColor={colors.Barcolor} />
      <Appbar.Header dark='true' style={{backgroundColor:colors.backgroundColor, elevation:6,  marginTop:StatusBar.currentHeight}}  >
      <IconRemix name="menu-fill"  size={30} color="#00B386" style={{}} onPress={()=>props.navigation.openDrawer()}/>
      <LogoBar/>
      </Appbar.Header>

      <View  style={colors.Input}>
        <View >
            <TextInput 
             theme={{ colors: { primary: '#00B386', text:'black', placeholder:'gray' } }}
             multiline={true}
             numberOfLines={4}
             
             style={styles.InputContent} ref={input} placeholder="¿Qué quieres compartir?"  maxLength={320}
             onChangeText={(value) => handle("ADV", value)}  right={<TextInput.Affix text="min:40" />}/>
        </View>

        <List.Section>
          <List.Accordion
            title="Categoría"
            theme={{colors:{ primary: '#00B386', text:'black', placeholder:'gray' }}}
            left={props => <List.Icon {...props} icon="folder" />}>
            <List.Item style={{backgroundColor:'white'}} onPress={()=>categoria='Amor'} title="Amor" />
            <List.Item style={{backgroundColor:'white'}} onPress={()=>categoria='Trabajo'} title="Trabajo" />
            <List.Item style={{backgroundColor:'white'}} onPress={()=>categoria='Estudios'} title="Estudios" />
          </List.Accordion>
        </List.Section>

        <View style={styles.button}>
          <Button  title="Publicar"  onPress={() => AddNewADV()}   />
        </View>
      </View>
      <Snackbar
        style={{margin:30}}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Vale',
          onPress: () => {
            // Do something
          },
        }}>
        INFO: Necesitas un minimo de 40 carácteres, además de seleccionar su categoria
      </Snackbar>
    </View>
);
}

const styles = StyleSheet.create({
  carouselContainer: {
    flex:1,
    backgroundColor:'#121212',
  },
  title:{
    fontSize:25, color:'#00B386', paddingVertical:14, marginLeft:20, fontFamily:'sans-serif-thing'
  },
  Input:{
    flex:1,
    height:300,
    backgroundColor: '#121212',
    justifyContent:'center',
    paddingHorizontal:20
  },
  InputContent:{
    borderWidth:2,
    backgroundColor:'white',
    color:'#121212',
    top:0,
    //height:300,
  },

  button:{
    marginTop:20,
    borderRadius:5
  }
  
});
export  default Post;