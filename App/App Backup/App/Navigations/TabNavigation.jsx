// import { View, Text } from 'react-native'
// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../Screens/HomeScreen/HomeScreen';
// import EmergencyScreen from '../Screens/EmergencyScreen/EmergencyScreen';
// import HeatMapScreen from '../Screens/HeatMapScreen/HeatMapScreen';
// import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Feather } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';
// import Colors from '../Utils/Colors.js';
// import HomeNavigation from './HomeNavigation';
// const Tab = createBottomTabNavigator();

// export default function TabNavigation() {
//   return (
//     <Tab.Navigator screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor:Colors.PRIMARY,
//         tabBarStyle: { backgroundColor: 'black' },
//         tabBarHideOnKeyboard:true, 
//     }}>
//         <Tab.Screen name='Home' component={HomeNavigation}
//         options={{
//             tabBarLabel:({color}) => (
//                 <Text style= {{color:color,fontSize:12,marginTop:-7}}>
//                     Home</Text>
//             ),
//             tabBarIcon:({color,size})=>(
//                 <FontAwesome5 name="home" size={size} color={color} />
//             )
//         }}
//         />
//         <Tab.Screen name='emergency' component={EmergencyScreen}
//              options={{
//                 tabBarLabel:({color}) => (
//                     <Text style= {{color:color,fontSize:12,marginTop:-7}}>
//                         Emergency</Text>
//                 ),
//                 tabBarIcon:({color,size})=>(
//                     <MaterialIcons name="emergency" size={size} color={color} />
//                 )
//             }}
//         />
//         <Tab.Screen name='heatmap' component={HeatMapScreen}
//             options={{
//                 tabBarLabel:({color}) => (
//                     <Text style= {{color:color,fontSize:12,marginTop:-7}}>
//                         Heat Map</Text>
//                 ),
//                 tabBarIcon:({color,size})=>(
//                     <Feather name="map-pin" size={size} color={color} />
//                 )
//             }}
//         />
//         <Tab.Screen name='profile' component={ProfileScreen}
//             options={{
//                 tabBarLabel:({color}) => (
//                     <Text style= {{color:color,fontSize:12,marginTop:-7}}>
//                         Profile</Text>
//                 ),
//                 tabBarIcon:({color,size})=>(
//                     <FontAwesome name="user-circle" size={size} color={color} />
//                 )
//             }}
//         />
//     </Tab.Navigator>
//   )
// }
import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import EmergencyScreen from '../Screens/EmergencyScreen/EmergencyScreen';
import HeatMapScreen from '../Screens/HeatMapScreen/HeatMapScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors.js';
import HomeNavigation from './HomeNavigation';
import { useUser } from '@clerk/clerk-expo';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    const { user, isLoading } = useUser();
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarStyle: { backgroundColor: 'black' },
            tabBarHideOnKeyboard:true,
        }}>
            <Tab.Screen name='Home' component={HomeNavigation}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                            Home</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    )
                }}
            />
        {/* <Tab.Screen name='emergency' component={EmergencyScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                            Emergency</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="emergency" size={size} color={color} />
                    )
                }}
            /> */}
            <Tab.Screen name='heatmap' component={HeatMapScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                            Heat Map</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="map-pin" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='profile' component={ProfileScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <View style={{ alignItems: 'center' }}>
                            {user && <Image style={{ width: 25, height: 25, borderRadius: 12,}} source={{ uri: user.imageUrl }} />}
                            <Text style={{ color: color, fontSize: 12, marginTop: -1 }}>
                                Profile</Text>
                        </View>
                    ),
                    tabBarIcon: ({ color, size }) => null // Remove the default icon
                }}
            />
            </Tab.Navigator>
    )
}