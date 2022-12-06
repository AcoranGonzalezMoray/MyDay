import { DarkTheme, DefaultTheme } from "@react-navigation/native"

export const darktheme = {
  ...DarkTheme,
  colors : {
    ...DarkTheme.colors,
    backgroundColor: '#121212', //fondo dark
    primary: '#00B386', //verde
    secondary: '#8b008b', //magenta
    text: 'white',
    error: '#D32F2F',
    tabBarColor:'black',
    activeColor: '#00B386',
    inactiveColor:'gray',
    divider:'white',
    card:'#121212',
    card2:'#191919',
    BottomBar:false,
    container: {
      backgroundColor:'#121212',
      borderTopWidth: 0.2,
      borderTopColor:'gray',
      elevation:8,
      
      
    },
    Input:{
      flex:1,
      height:300,
      backgroundColor: '#121212',
      justifyContent:'center',
      paddingHorizontal:20
    },
    ListItem:{
      flex:1,justifyContent:'center', alignItems:'center', marginVertical:10, marginHorizontal:10,backgroundColor:'#191919', elevation:4 
    },
    Barcolor:'#121212',
    Barcontent:'light-content'
  },
}
export const defaultheme = {
  ...DefaultTheme,
  colors : {
    ...DefaultTheme.colors,
    backgroundColor: '#FFFFFF',
    primary: '#00B386', //verde
    secondary: '#8b008b', //magenta
    text: 'black',
    error: '#D32F2F',
    tabBarColor:'white',
    activeColor: '#00B386',
    inactiveColor:'gray',
    divider:'gray',
    card:'white',
    card2:'white',
    BottomBar:true,
    container: {
      backgroundColor:'white',
      borderTopWidth: 0.2,
      borderTopColor:'gray',
      elevation:8,
      
      
    },
    Input:{
      flex:1,
      height:300,
      backgroundColor: 'white',
      justifyContent:'center',
      paddingHorizontal:20
    },
    ListItem:{
      flex:1,justifyContent:'center', alignItems:'center', marginVertical:10, marginHorizontal:10,backgroundColor:'white', elevation:4 
    },
    Barcolor:'white',
    Barcontent:'dark-content'
  },
}

