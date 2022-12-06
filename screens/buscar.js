// //**********************************BIBLIOTECA*********************************************** */
// import React,  { useState, useEffect } from 'react';
// import {Conexion_Firestore} from '../component/Firestore'
// import {
//     ScrollView,
//     StyleSheet,
//     View,
//   } from 'react-native';
//   import { Appbar } from 'react-native-paper';
// import { TextInput } from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {ListItem, Avatar} from 'react-native-elements'
// import { Divider } from 'react-native-paper';
// import IconRemix from '../component/RemixIcon/IconRemix'
// //********************************************************************************************* */


// const Search = (props) => {  

//   const [POST, setPOST] = useState([]);

//   const [term, Setterm] = useState({
//     Term:"",
//   });

//   const handle = (Term, value)=>{
//     Setterm({...term, [Term]:value});
//   } ;

//   useEffect(()=>{
//     Conexion_Firestore().collection('POST').orderBy("date", "desc").onSnapshot((querySnapshot) =>{
//       const POST = [];
//       querySnapshot.docs.forEach((doc) =>{
//         const {ADV} = doc.data();
//         POST.push({
//           id: doc.id,
//           ADV,
//         })
        
//       })
//       setPOST(POST)

//     });
//   },[])

//   return(
//       <View  style={{ flex:1, backgroundColor: '#121212'}}>
 
//       <Appbar.Header dark='true' style={{backgroundColor:'#121212', elevation:6}}  >
//       <IconRemix name="menu-fill"  size={30} color="#00B386" style={{}} onPress={()=>props.navigation.openDrawer()}/>
//       <IconRemix name="space-ship-fill"  size={30} color="#00B386" style={{marginLeft:150}} />
//       </Appbar.Header>
//         <View style={styles.searchBox}>
//         <TextInput onChangeText={(value) => handle("Term", value)} placeholder='Buscar post' placeholderTextcolor='#666'  style={styles.search}/>
//         <Icon  name="search" size={22} color='#666' style={styles.icon} />
//         </View>
//         <ScrollView>
//         {
          
//           POST.filter(trm => trm.ADV.includes(term.Term)).map(i => (
//             <ListItem  containerStyle={{backgroundColor:'#121212'}} key={i.id} bottomDivider>
//               <Divider style={{backgroundColor:'red'}}/>
//               <Avatar><Icon  name="search" size={22} color='white' style={styles.icon} /></Avatar>
//               <ListItem.Content >
//                 <ListItem.Title style={{color:'white'}}>ADV</ListItem.Title>
//                 <ListItem.Subtitle style={{color:'white'}}>{i.ADV}</ListItem.Subtitle>
//               </ListItem.Content>
//               <Divider/>
//             </ListItem>
 
//           ))
//         }
//         </ScrollView>
//       </View>
// );
// }



// const styles = StyleSheet.create({
//   carouselContainer: {
//     flex:1,
//     //height:720,
//     backgroundColor:'#121212',
//     //paddingHorizontal: 14
//   },
//   ImageBox:{
//     flex:1,
//     height: null,
//     width:null, 
//     opacity: 1,
//     justifyContent:'flex-start'
//   },
//   title:{
//     fontSize:25, color:'#00B386', paddingVertical:14, marginLeft:20, fontFamily:'sans-serif-thing'
//   },
//   searchBox:{
//     backgroundColor:'#fff',
//     elevation: 10,
//     borderRadius:4, 
//     marginVertical:10, 
//     width:'95%',
//     flexDirection:'row',
//     alignSelf: 'center'
//   },
//   search: {
//     padding:12,
//     paddingLeft:20, 
//     fontSize: 16
//   },
//   icon:{
//     position: 'absolute',
//     right:20, 
//     top: 14
//   }
// });
// export  default Search;