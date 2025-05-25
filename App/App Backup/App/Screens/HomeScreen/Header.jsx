// import React, { useRef, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, TextInput, Animated } from 'react-native';
// import { useUser } from '@clerk/clerk-expo';
// import { FontAwesome } from '@expo/vector-icons';

// export default function Header() {
//     const { user, isLoading } = useUser();
//     const fadeAnim = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.timing(
//             fadeAnim,
//             {
//                 toValue: 1,
//                 duration: 500, // Adjust the duration as needed
//                 useNativeDriver: true
//             }
//         ).start();
//     }, [fadeAnim]);

//     return user && (
//         <View style={styles.container}>
//             {/* Profile Section */}
//             <Animated.View style={[styles.profileContainer, { opacity: fadeAnim }]}>
//                 <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
//                 <View style={styles.profileText}>
//                     <Text style={{ fontSize: 24, color: 'white' }}>Welcome,</Text>
//                     <Text style={{ fontSize: 20, color: 'white', fontFamily: 'montserrat' }}>{user?.fullName}</Text>
//                 </View>
//             </Animated.View>
//             {/* Search Bar Section */}
//             <View style={styles.searchBarContainer}>
//                 <TextInput placeholder='Search' style={styles.textInput} />
//                 <FontAwesome name="search" style={styles.searchbtn} size={24} color="#ffe001" />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         paddingTop: 30,
//         backgroundColor: '#272727',
//         borderBottomLeftRadius: 25,
//         borderBottomRightRadius: 25,
//         backgroundColor: 'transparent',
//     },
//     profileContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
        
//     },
//     profileText: {
//         flexDirection: 'column', // Changed to column to stack text vertically
//         justifyContent: 'center', // Align text vertically
//         alignItems: 'flex-start', // Align text to the start
//     },
//     textInput: {
//         padding: 7,
//         paddingHorizontal: 16,
//         backgroundColor: 'white',
//         borderRadius: 8,
//         width: '85%',
//         fontSize: 15,
//         fontFamily: 'outfit'
//     },
//     searchBarContainer: {
//         marginTop: 15,
//         display: 'flex',
//         flexDirection: 'row',
//         gap: 7,
//     },
//     searchbtn: {
//         backgroundColor: "white",
//         padding: 10,
//         borderRadius: 8
//     },
//     userImage: {
//         width: 45,
//         height: 45,
//         borderRadius: 99
//     }
// });
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Animated, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const { user, isLoading } = useUser();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [searchText, setSearchText] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim]);

    const handleSearch = () => {
        // Implement your search functionality here
        console.log('Searching for:', searchText);
        // You can perform your search operations using the searchText state
        // For example, filter data based on searchText and display search results
        setIsSearchActive(true);
    };

    const handleItemClick = (item) => {
        // Implement navigation based on the clicked item
        switch (item) {
            case 'Emergency':
                navigation.navigate('emergency');
                break;
            case 'HeatMap':
                navigation.navigate('heatmap');
                break;
            case 'Enquiry':
                navigation.navigate('enquiry');
                break;
            case 'Profile':
                navigation.navigate('ProfilePage');
                break;
            case 'Contact':
                navigation.navigate('contactus');
                break;
            default:
                console.log("No Such Result Found!");
                break;
        }
    };

    const handleOutsideClick = () => {
        Keyboard.dismiss(); // Close the keyboard
        setIsSearchActive(false); // Hide search results when clicked outside
    };

    // Dummy search results, replace with actual search results based on searchText
    const searchResults = ['HeatMap', 'Emergency', 'Enquiry', 'Profile', 'Contact'];

    // Filtered search results based on the first character of each item
    const filteredSearchResults = searchResults.filter(item =>
        item.toLowerCase().startsWith(searchText.toLowerCase())
    );

    return user && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
            <View style={styles.container}>
                {/* Profile Section */}
                <Animated.View style={[styles.profileContainer, { opacity: fadeAnim }]}>
                    <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
                    <View style={styles.profileText}>
                        <Text style={{ fontSize: 24, color: 'white' }}>Welcome,</Text>
                        <Text style={{ fontSize: 20, color: 'white', fontFamily: 'montserrat' }}>{user?.fullName}</Text>
                    </View>
                </Animated.View>
                {/* Search Bar Section */}
                <View style={styles.searchBarContainer}>
                    <TextInput
                        placeholder='Search'
                        style={styles.textInput}
                        value={searchText}
                        onChangeText={setSearchText}
                        onFocus={() => setIsSearchActive(true)} // Set search active on focus
                        onBlur={() => setIsSearchActive(false)} // Set search inactive on blur
                    />
                    {/* <TouchableOpacity onPress={handleSearch}>
                        <FontAwesome name="search" style={styles.searchbtn} size={24} color="#ffe001" />
                    </TouchableOpacity> */}
                </View>
                {/* Display Search Results */}
                {isSearchActive && (
                    <View style={styles.searchResultsContainer}>
                        {filteredSearchResults.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleItemClick(item)}>
                                <Text style={styles.searchResult}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#272727',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: 'transparent',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    profileText: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textInput: {
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        width: '85%',
        fontSize: 15,
        fontFamily: 'outfit'
    },
    searchBarContainer: {
        marginTop: 15,
        width:'118%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchbtn: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99
    },
    searchResultsContainer: {
        backgroundColor: 'rgba(255,224,1,0.9)', // Set the background color of the search results container
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 5,
        borderWidth: 1, // Add border width
        borderColor: 'black', // Add border color
    },
    searchResult: {
        color: 'white',
        fontWeight: '800',
        marginTop: 1,
        textShadowColor: 'black',  // Adding black shadow
        textShadowOffset: { width: 1, height: 1 },  // Shadow offset
        textShadowRadius: 2,  // Shadow radius
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 10,
    }
});