import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, StatusBar } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      // source={require('../assets/background_dot.png')}
      // resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}
//theme.colors.surface
const styles = StyleSheet.create({
  background: {
    borderWidth:1,
    borderTopStartRadius:60,
    borderTopEndRadius:60,
    marginTop:20,
    elevation:20,
    flex: 1,
    width: '100%',
    backgroundColor: '#121212',
    marginTop:StatusBar.currentHeight 
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
})
