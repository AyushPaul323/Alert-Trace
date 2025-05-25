import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { useFonts } from 'expo-font';
export default function App() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit': require('./assets/fonts/Outfit-Thin.ttf'),
    'outfit': require('./assets/fonts/Outfit-Black.ttf'),
    'outfit': require('./assets/fonts/Outfit-Medium.ttf'),
    'montserrat':require('./assets/fonts/Montserrat-Medium.ttf'),
    'montserrat':require('./assets/fonts/Montserrat-SemiBold.ttf')
  });
  return (
    <ClerkProvider publishableKey='pk_test_ZW5oYW5jZWQtZGluZ28tNC5jbGVyay5hY2NvdW50cy5kZXYk'>
    <View style={styles.container}>
      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <Login />
        </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
});
