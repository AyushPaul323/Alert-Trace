// import { View, Image,Text,StyleSheet } from 'react-native'
// import React from 'react'

// export default function BusinessListItemSmall({business}) {
//   return (
//     <View style={styles.container}>
//       <Image source={{uri:business?.image?.url}}
//         style={styles.image}
//       />
//       <View>
//         <Text style={{fontWeight:'600', textAlign:'center', fontSize:17}}>{business?.name}</Text>
//       </View>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container:{
//     padding:10,
//     marginRight:10,
//     backgroundColor:'#rgba(251, 195, 3, 0.4)',
//     borderRadius:20,
//   },
//     image:{
//         width:250,
//         height:220,
//         borderRadius:10
//     }
// })
import { View, Image,Text,StyleSheet } from 'react-native'
import React from 'react'

export default function BusinessListItemSmall({business}) {
  return (
    <View style={styles.container}>
      <Image source={{uri:business?.image?.url}}
        style={styles.image}
      />
      <View>
        <Text style={{color: 'white',fontWeight: '800',marginTop: 1,textShadowColor: 'black',textShadowOffset: { width: 1, height: 1 },textShadowRadius: 2, textAlign:'center', fontSize:17}}>{business?.name}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    padding:10,
    marginRight:10,
    backgroundColor:'#rgba(251, 195, 3, 0.4)',
    borderRadius:20,
  },
    image:{
        width:250,
        height:220,
        borderRadius:10
    }
})