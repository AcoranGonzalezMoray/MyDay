import React from 'react'
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card, Button,Paragraph } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'; 
function category(props){
    const {filter} = props.route.params;
    const { colors } = useTheme();
    return(
    <View style={{backgroundColor:colors.backgroundColor, flex:1}}>
        <Icon name='arrow-left' size={17}onPress={()=>props.navigation.navigate('Home')} style={{margin:15,color:'#00B386'}}/>
        {
            filter.map(i=>(
                <Card key={i.id} style={{backgroundColor:colors.card, flex:1, width:'100%'}}>
                <Card.Content >
                  <Paragraph  style={{color:colors.text, fontSize:15, alignSelf:'center'}}>{i.ADV}</Paragraph>
                </Card.Content>
                
                <Card.Actions style={{alignSelf:'center'}}>
                  <Button>Reportar</Button>
    
                </Card.Actions>
    
            </Card>
            )) 
        }
    </View>);
}




export default  category;