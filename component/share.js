import React from 'react'
import {
    Share,
} from 'react-native';


export const shareMessage = (value) => {
    //Here is the Share API
    Share.share({
      
        title:'Descarga Moment',
        message: value.toString(),
      })
    
    // if (SHARE.action === Share.sharedAction) {
    //     console.log('aa')
    //     if (SHARE.activityType) {
    //       // shared with activity type of SHARE.activityType
    //       alert('Gracias por compatir con '+ SHARE.activityType)
    //     } else {
    //       // shared
    //       alert('Gracias por compatir aunque no sabemos como')
    //     }
    //   } else if (SHARE.action === Share.dismissedAction) {
    //     // dismissed
    //     alert('La proxima vez')
    //   }
}