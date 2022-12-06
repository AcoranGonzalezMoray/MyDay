import React from 'react'
import { View, Text, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
function Privacy_Policy(props){
    const { colors } = useTheme();
    return(<View style={{backgroundColor:colors.backgroundColor, flex:1}}>
        <Icon name='arrow-left' size={17}onPress={()=>props.navigation.navigate('Home')} style={{margin:15,color:'#00B386',marginTop:StatusBar.currentHeight}}/>
        <Text style={{color:colors.text, fontSize:35, alignSelf:'center'}}>Politica de Privacidad</Text>
    </View>);
}




export default  Privacy_Policy;