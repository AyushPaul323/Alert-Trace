// // import { View, Text,FlatList } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import Heading from '../../Components/Heading'
// // import GlobalApi from '../../Utils/GlobalApi'
// // import BusinessListItemSmall from './BusinessListItemSmall';


// // export default function BusinessList() {

// //         const [businessList,setBusinessList]=useState([]);
// //     useEffect(()=>{
// //         getBusinessList();
// //     },[])

// //     //Getting Business List From API
// // const getBusinessList=()=>{
// //     GlobalApi.getBusinessList().then(resp=>{
// //         //console.log(resp);
// //         setBusinessList(resp?.businessLists)
// //     })
// // }

// //   return (
// //     <View style={{marginTop:20}}>
// //       <Heading text={'Recent News'} isViewAll= {false}/>
// //       <FlatList
// //         data={businessList}
// //         horizontal={true}
// //         showsHorizontalScrollIndicator={false}
// //         renderItem={({item,index})=>(
// //             <View>
// //                 <BusinessListItemSmall business={item}/>
// //             </View>
// //         )}
// //       />
// //     </View>
// //   )
// // }
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Heading from '../../Components/Heading';
// import GlobalApi from '../../Utils/GlobalApi';
// import BusinessListItemSmall from './BusinessListItemSmall';
// import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

// export default function BusinessList() {
//   const navigation = useNavigation(); // Initialize useNavigation hook

//   const [businessList, setBusinessList] = useState([]);

//   useEffect(() => {
//     getBusinessList();
//   }, []);

//   // Getting Business List From API
//   const getBusinessList = () => {
//     GlobalApi.getBusinessList().then(resp => {
//       setBusinessList(resp?.businessLists);
//     });
//   };

//   // Function to handle item press and navigate to details page
//   const handleItemPress = (item) => {
//     // Navigate to details page and pass item details as params
//     navigation.navigate('DetailsPage', { item });
//   };

//   return (
//     <View style={{ marginTop: 20 }}>
//       <Heading text={'Recent News'} isViewAll={false} />
//       <FlatList
//         data={businessList}
//         horizontal={true}
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item, index }) => (
//           <TouchableOpacity onPress={() => handleItemPress(item)}>
//             <View>
//               <BusinessListItemSmall business={item} />
//             </View>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ScrollView, Image } from 'react-native';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItemSmall from './BusinessListItemSmall';
import { useNavigation } from '@react-navigation/native';

export default function BusinessList() {
  const navigation = useNavigation();

  const [businessList, setBusinessList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = () => {
    GlobalApi.getBusinessList().then(resp => {
      setBusinessList(resp?.businessLists);
    });
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Heading text={'Recent News'} isViewAll={false} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <View>
              <BusinessListItemSmall business={item} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.modalScrollView}>
              {selectedItem && (
                <View>
                  <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                  {selectedItem.image.url && (
                    <Image
                      source={{ uri: selectedItem.image.url }}
                      style={styles.modalImage}
                    />
                  )}
                  <Text style={styles.modalDescription}>{selectedItem.about}</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            
          </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    maxHeight:'50%'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    alignSelf:'center'
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#f9a807',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

