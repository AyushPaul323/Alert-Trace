import React, { useRef, useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
const { width, height } = Dimensions.get('window');
const carouselItemWidth = 200; // Adjust the width of carousel items as needed

export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(height)).current;
    const [showDescription, setShowDescription] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }
        ).start();
        Animated.timing(
            slideAnim,
            {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim, slideAnim]);

    const handleDescriptionToggle = (image) => {
        setSelectedImage(image);
        setShowDescription(!showDescription);
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image
                source={require('./../../../assets/images/back1.jpg')}
                style={styles.loginImage}
            />
            <View style={styles.alertTraceContainer}>
                <Text style={styles.alertText}>Alert<Text style={[styles.alertTraceText, { color: 'yellow' }]}> Trace</Text></Text>
            </View>
            <View style={styles.overlay}>
                <Carousel
                    data={[
                        require('./../../../assets/images/1212_crash.jpg'),
                        require('./../../../assets/images/Accident prone zone.jpg'),
                        require('./../../../assets/images/accident.jpg'),
                        require('./../../../assets/images/Avalanche.jpg'),
                        require('./../../../assets/images/Landslide.jpeg'),
                    ]}
                    renderItem={({ item }) => (
                        <Image source={item} style={styles.carouselItem} />
                    )}
                    sliderWidth={carouselItemWidth * 1.5} // Adjust slider width as needed
                    itemWidth={carouselItemWidth}
                    loop
                    autoplay
                />
            </View>
            <Animated.View style={[styles.subContainer, { transform: [{ translateY: slideAnim }] }]}>
                <Text style={styles.titleText}>
                    Saving Lives with <Text style={{ color: '#ffe001' }}>Precision and Speed</Text>
                </Text>
                <Text style={styles.descriptionText}>
                    Utilizing modern technologies for swift avalanche victim detection, accident victim detection, and GPS-based emergency alerts for rapid response.
                </Text>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Let's Get Started</Text>
                </TouchableOpacity>
            </Animated.View>
            <View style={styles.logoContainer}>
                {/* Image without pop-up description */}
                <Image
                    source={require('./../../../assets/images/sign-removebg-preview.png')}
                    style={styles.logoImage}
                />
                {/* Image without pop-up description */}
                <Image
                    source={require('./../../../assets/images/avalanches.png')}
                    style={styles.extraImage}
                />
            </View>

            {/* Modal for displaying pop-up description */}
            <Modal
                visible={showDescription}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDescription(false)}
            >
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback onPress={() => setShowDescription(false)}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>{selectedImage}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
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
    alertTraceContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20,
    },
    alertText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    alertTraceText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    overlay: {
        paddingTop: 300,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    carouselItem: {
        width: carouselItemWidth,
        height: carouselItemWidth,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    subContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.87)', // Adjust opacity here (0.7 is 70% opacity)
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    titleText: {
        fontSize: 24,
        color: '#ffffff',
    },
    descriptionText: {
        fontSize: 18,
        color: '#ffffff',
        marginTop: 20
    },
    button: {
        padding: 15,
        backgroundColor: 'yellow',
        borderRadius: 99,
        marginTop: 35,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 17,
    },
    logoContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    logoImage: {
        width: 50,
        height: 70,
        resizeMode: 'contain',
    },
    extraImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginTop: 10,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 16,
    },
});
