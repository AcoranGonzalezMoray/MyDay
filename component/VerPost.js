import React from 'react'
import { View, Text, TouchableHighlight, StatusBar } from 'react-native';
import {Conexion_Firestore} from '../component/Firestore'
import IconRemix from './RemixIcon/IconRemix'
import { useTheme } from '@react-navigation/native';
function Ver_Post(props){
    const {ADV, ID, LIKE} = props.route.params;
    const { colors } = useTheme();
    const borrar_post = ()=>{Conexion_Firestore().collection('POST').doc(ID).delete()
    .then(()=>props.navigation.goBack())}
;

    return(
    <View style={{backgroundColor:colors.backgroundColor, flex:1}}>
        <IconRemix name='arrow-left-line' size={25} onPress={()=>props.navigation.navigate('Home')} style={{margin:15,marginTop:StatusBar.currentHeight,left:0,color:'#00B386'}}/>
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <View>
                <Text style={{color:colors.text, fontSize:20, alignSelf:'center', margin:10}}>{JSON.stringify(ADV)}</Text>
            </View>
            <TouchableHighlight style={{borderWidth:1, borderRadius:10}} onPress={borrar_post}>
            <IconRemix  name='delete-bin-line' size={25}  style={{margin:15,color:'red'}}/>
            </TouchableHighlight>
        </View>
        
    </View>
    
    );
}




export default Ver_Post;