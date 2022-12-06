import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/taza.png')} style={styles.image} />
}
export  function LogoBar() {
  return <Image style={{height:50, width:50, marginHorizontal:140}} source={require('../assets/tazaBar.png')} />
}
const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    marginBottom: 1,
  },
  imageBar: {
  },
})
