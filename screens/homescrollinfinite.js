//**********************************BIBLIOTECA*********************************************** */
import React,  { useState, useEffect} from 'react';
import {Conexion_Firestore} from '../component/Firestore'
import {Conexion_Auth} from '../component/Auth'
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    
  } from 'react-native';
  import { Appbar } from 'react-native-paper';
import IconRemix from '../component/RemixIcon/IconRemix'
import {Card, Button,Paragraph, FAB, ActivityIndicator, } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { LogoBar } from '../src/components/Logo';
import { shareMessage } from '../component/share';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
//******************************************************************************************************* */



function Home (props)  { 
  
  const { colors } = useTheme();
  //inicializamos valores
  const [POST, setPOST] = useState([]);
  const [startAfter, setstartAfter] = useState(Object);
  const [postPerLoad] = useState(5);
  const [lastPost, setlastPost] = useState(false);

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  changeNavigationBarColor(colors.backgroundColor,colors.BottomBar)
  useEffect(()=>{
    const subs = Conexion_Firestore().collection('POST').orderBy('date','desc').limit(postPerLoad).onSnapshot((querySnapshot) =>{
      const POSt = [];
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
      querySnapshot.docs.forEach((doc) =>{
        const {ADV, likeid, categoria} = doc.data();

        POSt.push({
          id: doc.id,
          ADV,
          categoria,
          likeid,
        })
        
      })
      setPOST([...POST, ...POSt])
      setstartAfter(lastVisible)
    });
    return ()=> subs();
  }, [])




async function getMorePost() {
  if(!lastPost){
  Conexion_Firestore().collection('POST').orderBy('date','desc').startAfter(startAfter).limit(postPerLoad).onSnapshot((querySnapshot) =>{
    const POSt = [];
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
    querySnapshot.docs.forEach((doc) =>{
      const {ADV, likeid, categoria} = doc.data();

      POSt.push({
        id: doc.id,
        ADV,
        categoria,
        likeid,
      })
      
    })
    setPOST([...POST, ...POSt])
    setstartAfter(lastVisible)
    POSt.length ==0?setlastPost(true):setlastPost(false)   
  });
}
}

let lastPress = 0;


const onDoublePress = (item) => {
  const time = new Date().getTime();
  const delta = time - lastPress;
  const DOUBLE_PRESS_DELAY = 400;;
  let liked = false;
  

    
  if (delta < DOUBLE_PRESS_DELAY) {
    POST.map(i=>{
      if(i.id == item && i.likeid.includes( Conexion_Auth().currentUser.uid)){ liked = true}
    });
    // Success double press
    if(liked){

      Conexion_Firestore().collection('POST').doc(item).update({
        likeid: Conexion_Firestore.FieldValue.arrayRemove( Conexion_Auth().currentUser.uid),
      })
    }else{

      Conexion_Firestore().collection('POST').doc(item).update({
        likeid: Conexion_Firestore.FieldValue.arrayUnion(Conexion_Auth().currentUser.uid),
      })
    }
      
  }
  lastPress = time;
};


const renderitem = 
  ({item}) => {
    
    if(item.likeid.includes( Conexion_Auth().currentUser.uid)){icon = StyleSheet.create({icon:{color:'#00B386'}, icon_text:{color:'#00B386', fontSize:20}})}
    else{icon = StyleSheet.create({icon:{color:'rgba(52, 52, 52, 0.8)'}, icon_text:{color:'rgba(52, 52, 52, 0.8)', fontSize:20}})}

    return (
      
      <View  style={colors.ListItem}>
        
        <Card onPress={()=>onDoublePress(item.id)} onLongPress={()=>shareMessage(item.ADV)} style={{backgroundColor: colors.card2, flex:1, width:'100%'}}>
        
            <Card.Content >
              <Paragraph  style={{color:colors.text, fontSize:15, alignSelf:'center'}}>{item.ADV}</Paragraph>
            </Card.Content>
            
            <Card.Actions style={{alignSelf:'center'}}>
              <IconRemix  name="heart-fill" size={20} color='#00B386' style={icon.icon}/><Text style={icon.icon_text}> {item.likeid.length}</Text>
              <Button >Reportar</Button>
              
            </Card.Actions>

        </Card>
      </View>
    )
  }

//const MemoItem = useMemo(()=>renderitem, [POST])
const keyextractor = (_, index)=>index.toString();
const CATEGORY_LOVE= ()=>{
  const filter = POST.filter(trm => trm.categoria.includes("Amor"))
  props.navigation.navigate("Category", {filter:filter})

}
  return(   
    
    <View  style={{flex:1, backgroundColor:colors.backgroundColor,}}>
      <StatusBar barStyle={colors.Barcontent} translucent backgroundColor={colors.Barcolor} />
      <Appbar.Header dark='true' style={{backgroundColor: colors.backgroundColor, elevation:6, marginTop:StatusBar.currentHeight}}  >
      <IconRemix name="menu-fill"  size={30} color="#00B386" style={{}} onPress={()=>props.navigation.openDrawer()}/>
      <LogoBar/>
      </Appbar.Header>
      
      <View  style={{ flex:1, backgroundColor: colors.backgroundColor}}> 
        <FlatList
        style={{flex:1}}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
       
        onEndReached={getMorePost}
        onEndReachedThreshold = {0.01}
        scrollEventThrottle={150}
        ListFooterComponent = {()=>!lastPost && <ActivityIndicator animating={true} size={30} style={{margin:5}} color="#00B386" />}
        data={POST}
        keyExtractor={keyextractor}
        renderItem={renderitem}
      />
      </View>
        <FAB.Group
          open={open}
          fabStyle={{backgroundColor:'#00B386'}}
          icon={open ? 'earth' : 'plus'}
          actions={[
            { icon: 'plus'},
            {
              icon: 'heart',
              label: 'Amor',
              onPress: () => CATEGORY_LOVE(),
            },
            {
              icon: 'briefcase',
              label: 'Trabajo',
             
            },
            {
              icon: 'book-open',
              label: 'Estudios',
              //small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
              
            }
          }} 
        />
    </View>
        
    );


}



let icon = StyleSheet.create({})

const styles = StyleSheet.create({

  ListItem:{
    flex:1,justifyContent:'center', alignItems:'center', marginVertical:10, marginHorizontal:10,backgroundColor:'#191919', elevation:4 
  },

  carouselContainer: {
      flex:1,
      //height:720,
     
      
      //paddingHorizontal: 14
    },
  title:{
    fontSize:25, color:'#00B386', paddingVertical:14, marginLeft:20, fontFamily:'sans-serif-thing'
  },
  });

export  default Home;