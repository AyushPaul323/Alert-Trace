import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const navigation=useNavigation()
    useEffect(() => {
        getCategories();
    }, []);

    // Get Categories List
    const getCategories = () => {
        GlobalApi.getCategories().then(resp => {
            setCategories(resp?.categories);
        })
    }

    return (
        <View style={{}}>
            <Heading text={'Categories'} isViewAll={false} />
            <FlatList
                data={categories}
                numColumns={4}
                renderItem={({ item, index }) => index <= 3 && (
                    <TouchableOpacity style={styles.container}
                    onPress={()=>{
                        switch(item.name){
                            case 'Emergency':
                                navigation.navigate('emergency');
                                break;
                            case 'HeatMap':
                                navigation.navigate('heatmap');
                                break;
                            case 'Enquiry':
                                navigation.navigate('enquiry');
                                break;
                            case 'Contact-Us':
                                navigation.navigate('contactus');
                                break;
                            default:
                                break;
                        }
                    }}>
                        <View style={styles.iconContainer}>
                            <Image source={{ uri: item?.icon?.url }}
                                style={{ width: 35, height: 35 }}
                            />
                        </View>
                        <Text style={styles.textStyle}>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: 'rgba(255, 224, 1, 0.4)',
        padding: 30,
        borderRadius: 99
    },
    textStyle: {
        color: 'white',
        fontWeight: '800',
        marginTop: 1,
        textShadowColor: 'black',  // Adding black shadow
        textShadowOffset: { width: 1, height: 1 },  // Shadow offset
        textShadowRadius: 2,  // Shadow radius
    }
})