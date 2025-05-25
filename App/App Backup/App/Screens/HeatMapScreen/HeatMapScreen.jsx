// import React,{useState} from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import MapView, { Circle } from 'react-native-maps';
// import { useNavigation } from '@react-navigation/native';

// export default function HeatMapScreen() {
//   const navigation = useNavigation();
//   const [message, setMessage] = useState('');

  
//   const markers = [
//     // Avalanche-prone areas
//     { coordinate: { latitude: 34.0844, longitude: 77.5592 } }, // Kashmir region
//     { coordinate: { latitude: 32.0842, longitude: 76.3041 } }, // Himachal Pradesh
//     { coordinate: { latitude: 30.7131, longitude: 79.2084 } }, // Uttarakhand
//     { coordinate: { latitude: 33.7782, longitude: 76.5762 } }, // Jammu region
//     { coordinate: { latitude: 30.6425, longitude: 79.8322 } }, // Gangotri Glacier region
//     { coordinate: { latitude: 31.4451, longitude: 77.2674 } }, // Solang Valley
//   ];

//   const markers2 = [
//     // Accident-prone areas
//     { coordinate: { latitude: 28.7041, longitude: 77.1025 } }, // Delhi
//     { coordinate: { latitude: 19.0760, longitude: 72.8777 } }, // Mumbai
//     { coordinate: { latitude: 22.5726, longitude: 88.3639 } }, // Kolkata
//     { coordinate: { latitude: 13.0827, longitude: 80.2707 } }, // Chennai
//     { coordinate: { latitude: 17.3850, longitude: 78.4867 } }, // Hyderabad
//     { coordinate: { latitude: 12.9716, longitude: 77.5946 } }, // Bangalore
//   ];

//   const handleMapPress = (event) => {
//     const { coordinate } = event.nativeEvent;
//     const isInCircle = (marker) => {
//       const { latitude, longitude } = marker.coordinate;
//       const distance = Math.sqrt(
//         Math.pow(coordinate.latitude - latitude, 2) +
//         Math.pow(coordinate.longitude - longitude, 2)
//       );
//       return distance <= 0.5; // Adjust the radius as needed
//     };

//     const inAvalancheProneArea = markers.some(isInCircle);
//     const inAccidentProneArea = markers2.some(isInCircle);

//     if (inAvalancheProneArea) {
//       setMessage('Avalanche Prone Area');
//       setTimeout(() => setMessage(''), 4000); // Clear message after 4 seconds
//     } else if (inAccidentProneArea) {
//       setMessage('Accident Prone Area');
//       setTimeout(() => setMessage(''), 4000); // Clear message after 4 seconds
//     } else {
//       setMessage('');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 22.9868,
//           longitude: 87.8550,
//           latitudeDelta: 30,
//           longitudeDelta: 30,
//         }}
//         onPress={handleMapPress}
//       >
//         {markers.map((marker, index) => (
//           <Circle
//             key={index}
//             center={marker.coordinate}
//             radius={60000}
//             strokeWidth={0}
//             fillColor="rgba(0, 128, 0, 0.5)"
//           />
//         ))}
//         {markers2.map((marker, index) => (
//           <Circle
//             key={index}
//             center={marker.coordinate}
//             radius={60000}
//             strokeWidth={0}
//             fillColor="rgba(255, 0, 0, 0.5)"
//           />
//         ))}
//       </MapView>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <View style={styles.iconWrapper}>
//           <Ionicons name="arrow-back-outline" size={30} color="black" />
//         </View>
//       </TouchableOpacity>
//       {/* <View style={styles.infoBox}>
//         <View style={styles.boxItem}>
//           <View style={[styles.markerColor, { backgroundColor: 'rgba(0, 128, 0, 0.5)' }]} />
//           <Text style={styles.boxText}>Avalanche Prone Area</Text>
//         </View>
//         <View style={styles.boxItem}>
//           <View style={[styles.markerColor, { backgroundColor: 'rgba(255, 0, 0, 0.5)' }]} />
//           <Text style={styles.boxText}>Accident Prone Area</Text>
//         </View>
//       </View> */}
//       {message !== '' && (
//       <View style={styles.messageContainer}>
//         <Text style={styles.messageText}>{message}</Text>
//       </View>
//     )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   infoBox: {
//     position: 'absolute',
//     bottom: 20,
//     right: 24,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 10,
//     padding: 10,
//     flexDirection: 'row',
//   },
//   boxItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   markerColor: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     marginRight: 5,
//   },
//   boxText: {
//     fontSize: 16,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 35,
//     left: 30,
//   },
//   iconWrapper: {
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 50,
//     padding: 10,
//   },
//   messageContainer: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 10,
//     borderRadius: 10,
//   },
//   messageText: {
//     fontSize: 16,
//   },
// });

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function HeatMapScreen() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const mapViewRef = useRef(null);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const markers = [
    // Avalanche-prone areas
    { coordinate: { latitude: 34.0844, longitude: 77.5592 } }, // Kashmir region
    { coordinate: { latitude: 32.0842, longitude: 76.3041 } }, // Himachal Pradesh
    { coordinate: { latitude: 30.7131, longitude: 79.2084 } }, // Uttarakhand
    { coordinate: { latitude: 33.7782, longitude: 76.5762 } }, // Jammu region
    { coordinate: { latitude: 30.6425, longitude: 79.8322 } }, // Gangotri Glacier region
    { coordinate: { latitude: 31.4451, longitude: 77.2674 } }, // Solang Valley
  ];

  const markers2 = [
    // Accident-prone areas
    { coordinate: { latitude: 28.7041, longitude: 77.1025 } }, // Delhi
    { coordinate: { latitude: 19.0760, longitude: 72.8777 } }, // Mumbai
    //{ coordinate: { latitude: 22.5726, longitude: 88.3639 } }, // Kolkata
    { coordinate: { latitude: 13.0827, longitude: 80.2707 } }, // Chennai
    { coordinate: { latitude: 17.3850, longitude: 78.4867 } }, // Hyderabad
    { coordinate: { latitude: 12.9716, longitude: 77.5946 } }, // Bangalore
  ];

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    const isInCircle = (marker) => {
      const { latitude, longitude } = marker.coordinate;
      const distance = Math.sqrt(
        Math.pow(coordinate.latitude - latitude, 2) +
        Math.pow(coordinate.longitude - longitude, 2)
      );
      return distance <= 0.5; // Adjust the radius as needed
    };

    const inAvalancheProneArea = markers.some(isInCircle);
    const inAccidentProneArea = markers2.some(isInCircle);

    if (inAvalancheProneArea) {
      setMessage('Avalanche Prone Area');
      setTimeout(() => setMessage(''), 4000); // Clear message after 4 seconds
    } else if (inAccidentProneArea) {
      setMessage('Accident Prone Area');
      setTimeout(() => setMessage(''), 4000); 
    } else {
      setMessage('');
    }
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setMessage('Permission to access location was denied');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const recenterMap = async () => {
    await getLocationAsync();
    if (userLocation && mapViewRef.current) { // Check if mapViewRef.current exists
      mapViewRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.09222,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: 22.9868,
          longitude: 87.8550,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
        onPress={handleMapPress}
      >
        {markers.map((marker, index) => (
          <Circle
            key={index}
            center={marker.coordinate}
            radius={60000}
            strokeWidth={0}
            fillColor="rgba(0, 128, 0, 0.5)"
          />
        ))}
        {markers2.map((marker, index) => (
          <Circle
            key={index}
            center={marker.coordinate}
            radius={60000}
            strokeWidth={0}
            fillColor="rgba(255, 0, 0, 0.5)"
          />
        ))}
        {userLocation && (
          <Marker
            coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
            title="You are here"
            description="Your current location"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.locationButton} onPress={recenterMap}>
        <View style={styles.iconWrapper}>
          <Ionicons name="locate-sharp" size={30} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={styles.iconWrapper}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </View>
      </TouchableOpacity>
      {message !== '' && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoBox: {
    position: 'absolute',
    bottom: 20,
    right: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  boxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  markerColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  boxText: {
    fontSize: 16,
  },
  locationButton: {
    position: 'absolute',
    top: 750,
    right: 15,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 30,
  },  
  iconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
    padding: 10,
  },
  messageContainer: {
    position: 'absolute',
    top: 40,
    left: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
});