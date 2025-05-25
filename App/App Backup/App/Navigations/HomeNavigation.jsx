import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../Screens/BusinessListByCategoryScreen/BusinessListByCategoryScreen';
import EmergencyScreen from '../Screens/EmergencyScreen/EmergencyScreen';
import HeatMapScreen from '../Screens/HeatMapScreen/HeatMapScreen';
import EnquiryScreen from '../Screens/EnquiryScreen/EnquiryScreen';
import ContactUsScreen from '../Screens/ContactUsScreen/ContactUsScreen';
import DetailsPage from '../Screens/HomeScreen/DetailsPage';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='home' component={HomeScreen}/>
        {/*<Stack.Screen name='business-list' component={BusinessListByCategoryScreen}/>*/}
        <Stack.Screen name='emergency' component={EmergencyScreen}/>
        <Stack.Screen name='heatmap' component={HeatMapScreen}/>
        <Stack.Screen name='enquiry' component={EnquiryScreen}/>
        <Stack.Screen name='contactus' component={ContactUsScreen}/>
        <Stack.Screen name='DetailsPage' component={DetailsPage}/>
        <Stack.Screen name='ProfilePage' component={ProfileScreen}/>
    </Stack.Navigator>
  )
}