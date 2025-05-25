import { View, Text,StyleSheet,Image,ScrollView,TouchableOpacity, } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsPage({route}) {
  const navigation = useNavigation();
  const { item } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
            source={require('./../../../assets/images/back1.jpg')}
            style={styles.loginImage}/>
      <View style={{padding:20,paddingTop:40}}>
        <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}
            onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
          {/* <Text style={{fontSize:25,fontFamily:'outfit',color:"white"}}>{item?.name}</Text> */}
        </TouchableOpacity>
      </View>
      <Image source={{uri:item?.image?.url}} style={styles.image}/>
      <Text style={styles.title}>{item?.about}</Text>
      
      {/* Add more details as needed */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loginImage: {
    width: 450,
    height: 900,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
},
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  title: {
    color:"black"
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  otherDetails: {
    fontSize: 16,
    marginBottom: 5,
  },
  image:{
    width:250,
    height:220,
    borderRadius:10
}
});



