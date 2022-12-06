//**********************************BIBLIOTECA*********************************************** */
import React, {useState, useEffect, memo} from 'react';
import {Conexion_Firestore} from '../component/Firestore'
import {Conexion_Auth} from '../component/Auth'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    StatusBar
  } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconRemix from '../component/RemixIcon/IconRemix'
import { FlatList} from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useTheme } from '@react-navigation/native';
import { LogoBar } from '../src/components/Logo';
//********************************************************************************* */




const Profile = (props) => {

  //inicializamos valores
  const [POST, setPOST] = useState([]);
  const { colors } = useTheme();

  useEffect(()=>{
    //se crea base de datos
    const subs = Conexion_Firestore().collection('POST').where('User_id', '==' , Conexion_Auth().currentUser.uid ).onSnapshot((querySnapshot) =>{
      const POST = [];
      querySnapshot.docs.forEach((doc) =>{
        const {ADV} = doc.data();
        const {likeid} = doc.data();
        POST.push({
          id: doc.id,
          ADV,
          likeid
        })
        
      })
      setPOST(POST)
      
    });
    return ()=> subs();
  }, [])



  const numColumns =3;
  
  return(
    <View  style={styles.carouselContainer}>
      <StatusBar barStyle={colors.Barcontent} translucent backgroundColor={colors.Barcolor} />
      <Appbar.Header dark='true' style={{backgroundColor:colors.backgroundColor, elevation:6,marginTop:StatusBar.currentHeight}}  >
      <IconRemix name="menu-fill"  size={30} color="#00B386" style={{}} onPress={()=>props.navigation.openDrawer()}/>
      <LogoBar/>
      </Appbar.Header>

      <View  style={{ flex:1, backgroundColor: colors.backgroundColor}}>
      <Divider/>

      <View style={{flexDirection:"row", justifyContent:'center', alignItems:'center'}}>
          <View style={{margin:8, justifyContent:'center', alignItems:'center'}} >

            <View style={{flexDirection:"row"}} >
              <Icon  name="user-circle" size={60} color='#666' style={styles.icon} />
            </View>

            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:20,color:colors.text, }}>@{Conexion_Auth().currentUser.displayName}</Text>
            </View>
            <View style={{flexDirection:'row-reverse'}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <Text  style={{fontSize:20,color:colors.text}}>20</Text>
                  <Text  style={{fontSize:20,color:colors.text}}>Comentarios</Text>
                </View>
                <View style={{justifyContent:'center', marginLeft:40,marginHorizontal:20,alignItems:'center'}}>
                  <Text  style={{fontSize:20,color:colors.text}}>{POST.length}</Text>
                  <Text  style={{fontSize:20,color:colors.text}}>Publicaciones</Text>
                </View>
                <View style={{justifyContent:'center',marginLeft:50, alignItems:'center'}}>
                  <Text  style={{fontSize:20,color:colors.text}}>3</Text>
                  <Text  style={{fontSize:20,color:colors.text}}>Likes</Text>
                </View>    
              </View>
          </View>
          
          
      </View>

        <Divider/>
        <FlatList
          style={{flex:1}}
          showsVerticalScrollIndicator={true}
          vertical
          data={POST}
          initialNumToRender={7}
          keyExtractor={(_, index)=>index.toString()}
          numColumns={numColumns}
          renderItem={({item}) => {

            return (
                <TouchableHighlight onPress={()=>props.navigation.navigate("Ver_Post", {ADV:item.ADV,ID:item.id,LIKE:item.likeid})}>
                <View style={{width:120, height:120,margin:5,justifyContent:'center',alignItems:'center',backgroundColor:colors.card2, elevation:3}}>
                <Text style={{fontSize:5, color:colors.text,alignSelf:'center',marginHorizontal:10, fontFamily:'sans-serif-thing'}}>{item.ADV}</Text>
                </View>
                </TouchableHighlight>
            )
          }}
        />
      </View>
    </View>
);
}

const styles = StyleSheet.create({
  carouselContainer: {
    flex:1,
    backgroundColor:'#121212',
    
  },
  ImageBox:{
    flex:1,
    height: null,
    width:null, 
    opacity: 1,
    justifyContent:'flex-start'
  },
  title:{
    fontSize:25, color:'#00B386', paddingVertical:14, marginLeft:20, fontFamily:'sans-serif-thing'
  }
});
export  default memo( Profile);