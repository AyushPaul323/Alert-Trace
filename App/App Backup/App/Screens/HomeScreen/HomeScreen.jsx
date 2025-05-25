// import { View, Text, Image, StyleSheet, Animated, ScrollView } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import Header from './Header';
// import Slider from './Slider';
// import Categories from './Categories';
// import BusinessList from './BusinessList';

// export default function HomeScreen() {
//     const fadeAnim = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         fadeIn();
//     }, []);

//     const fadeIn = () => {
//         Animated.timing(
//             fadeAnim,
//             {
//                 toValue: 1,
//                 duration: 1000, // Adjust the duration as needed
//                 useNativeDriver: true
//             }
//         ).start();
//     };

//     return (
//         <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//             <Image
//                 source={require('./../../../assets/images/back1.jpg')}
//                 style={styles.loginImage}
//             />
//             {/* Header */}
//             <Header />
//             <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <View style={styles.contentContainer}>
//                 {/* {Slider} */}
//                 <Slider />
//                 <Categories />
//                 <BusinessList />
//             </View>
//             </ScrollView>
//         </Animated.View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     loginImage: {
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         resizeMode: 'cover',
//     },
//     contentContainer: {
//         padding: 20,
//     },
//     scrollViewContent: {
//         flexGrow: 1,
//     },
// });
import { View, StyleSheet, Animated, FlatList, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Header from './Header';
import Slider from './Slider';
import Categories from './Categories';
import BusinessList from './BusinessList';
import NewsList from './BusinessList';

export default function HomeScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        fadeIn();
    }, []);

    const fadeIn = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000, // Adjust the duration as needed
                useNativeDriver: true
            }
        ).start();
    };

    // Sample data for FlatList
    const data = [
        { id: '1', type: 'slider' },
        { id: '2', type: 'categories' },
        { id: '3', type: 'businessList' },
    ];

    // Render item function for FlatList
    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'slider':
                return <Slider />;
            case 'categories':
                return <Categories />;
            case 'businessList':
                return <BusinessList />;
            default:
                return null;
        }
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image
                source={require('./../../../assets/images/back1.jpg')}
                style={styles.loginImage}
            />
            {/* Header */}
            <Header />
            {/* FlatList to render different components */}
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contentContainer}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginImage: {
        width: 450,
        height: 900,
        position: 'absolute',
        top: 0,
        left: 0,
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 20,
    },
});
