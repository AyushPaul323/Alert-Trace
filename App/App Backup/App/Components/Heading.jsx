import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function Heading({text,isViewAll=false}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {text}
    </Text>
    {isViewAll?<Text style={{color:'#000000', fontWeight:800}}>View All</Text>:null}
    </View>
  )
}
const styles= StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    heading:{
        fontSize:20, 
        fontFamily:'outfit',
        marginBottom:10,
        color: 'white',
        fontWeight: '800',
        marginTop: 1,
        textShadowColor: 'black',  // Adding black shadow
        textShadowOffset: { width: 1, height: 1 },  // Shadow offset
        textShadowRadius: 2,  // Shadow radius
    },
});