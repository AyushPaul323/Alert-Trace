import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, } from "react-native";
import { useClerk } from "@clerk/clerk-react";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, signOut } = useClerk();

  return (
    <View style={styles.container}>
      <Image
        source={require("./../../../assets/images/back1.jpg")}
        style={styles.loginImage}
      />
      <View>
        <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center'}}
            onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
          {/* <Text style={{fontSize:25,fontFamily:'outfit',color:"white"}}>{item?.name}</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <Text style={styles.textStyle}>{user && user.fullName}</Text>
        <Text style={styles.email}>{user && user.email}</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, styles.logoutOption]}
          onPress={signOut}
        >
          <Text style={[styles.optionText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    //padding: 30,
    paddingTop:50,
    paddingRight:20,
    paddingLeft:20
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    top:6
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#777",
  },
  optionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    top:40
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  logoutOption: {
    marginTop: 20,
    borderBottomWidth: 0, // Remove border bottom for logout option
  },
  logoutText: {
    color: "red",
    textAlign: "center",
  },
  loginImage: {
    width: 450,
    height: 900,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  textStyle: {
    color: 'white',
    fontSize:30,
    fontWeight: '800',
    marginTop: 1,
    textShadowColor: 'black',  // Adding black shadow
    textShadowOffset: { width: 1, height: 1 },  // Shadow offset
    textShadowRadius: 2,  // Shadow radius
}
});
