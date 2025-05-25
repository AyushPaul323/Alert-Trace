// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import CalendarPicker from 'react-native-calendar-picker';

// export default function EmergencyScreen() {
//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');
//   const [date, setDate] = useState('');
//   const [submitSuccess, setSubmitSuccess] = useState(false); // State to track submit success
//   const [submitError, setSubmitError] = useState(false); // State to track submit error

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('http://192.168.29.32:3001/api/emergencies', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, phone, location, date }),
//       });
//       if (response.ok) {
//         console.log('Emergency data saved successfully');
//         setName("");
//         setPhone("");
//         setLocation("");
//         setSubmitSuccess(true); // Set submit success state to true
//         setSubmitError(false); // Reset submit error state
//         setTimeout(() => {
//           setSubmitSuccess(false);
//         }, 4000);
//       } else {
//         console.error('Failed to save emergency data');
//         setSubmitError(true); // Set submit error state to true
//         setSubmitSuccess(false); // Reset submit success state
//       }
//     } catch (error) {
//       console.error('Error saving emergency data:', error);
//       setSubmitError(true); // Set submit error state to true
//       setSubmitSuccess(false); // Reset submit success state
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Image
//           source={require('./../../../assets/images/back1.jpg')}
//           style={styles.loginImage} />
//         <View style={{ padding: 20, paddingTop: 40 }}>
//           <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
//             onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back-outline" size={30} color="white" />
//             {/* <Text style={{ fontSize: 25, fontFamily: 'outfit', color: "white" }}>Emergency</Text> */}
//           </TouchableOpacity>
//         </View>
//         {/* Calendar Section */}
//         <View style={styles.calendarContainer}>
//           <CalendarPicker
//             value={date}
//             onDateChange={(selectedDate) => setDate(selectedDate)}
//             width={360}
//             minDate={Date.now()}
//             todayBackgroundColor="grey"
//             todayTextStyle={{ color: 'white' }}
//             selectedDayColor="black"
//             selectedDayTextColor="white"
//             // onChangeText={setDate}
//           />
//         </View>

//         {/* Form Section */}
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Phone No"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Location"
//             value={location}
//             onChangeText={setLocation}
//           />
//           <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//             <Text style={styles.submitButtonText}>Submit</Text>
//           </TouchableOpacity>
//           {/* Success and Error Messages */}
//           {submitSuccess && (
//             <Text style={styles.successMessage}>Form submitted successfully!</Text>
//           )}
//           {submitError && (
//             <Text style={styles.errorMessage}>Failed to submit form. Please try again later.</Text>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   loginImage: {
//     width: 450,
//     height: 900,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     resizeMode: 'cover',
//   },
//   container: {
//     flexGrow: 1,
//     backgroundColor: 'black',
//     padding: 20,
//   },
//   calendarContainer: {
//     backgroundColor: 'rgba(255, 255, 225, 0.9)',
//     borderRadius: 25,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: 'black',
//     shadowOpacity: 0.9,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   formContainer: {
//     backgroundColor: 'rgba(255, 255, 225, 0.9)',
//     borderRadius: 20,
//     padding: 20,
//     marginBottom: 20,
//     shadowColor: 'black',
//     shadowOpacity: 0.9,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   input: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },
//   submitButton: {
//     backgroundColor: 'yellow',
//     borderRadius: 50,
//     padding: 15,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontWeight: '800',
//   },
//   successMessage: {
//     color: 'green',
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   errorMessage: {
//     color: 'red',
//     fontSize: 16,
//     marginTop: 10,
//     textAlign: 'center',
//   },
// });






import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { getCurrentPositionAsync } from 'expo-location';

export default function EmergencyScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false); // State to track submit success
  const [submitError, setSubmitError] = useState(false); // State to track submit error
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  useEffect(() => {
    // Check if the form is valid
    setIsFormValid(
      name.trim() !== '' &&
      phone.trim() !== '' &&
      location.trim() !== '' &&
      date !== '' &&
      error === ''
    );
  }, [name, phone, location, date, error]);

  const getCurrentLocation = async () => {
    try {
      const { coords } = await getCurrentPositionAsync({});
      const { latitude, longitude } = coords;
      setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
    } catch (error) {
      console.error('Error getting current location:', error);
      // Handle error appropriately
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6789]\d{9}$/;
    if (phoneRegex.test(phone)) {
      setError('');
    } else {
      setError('Please enter a valid Indian phone number');
    }
    setPhone(phone);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.50.152:3001/api/emergencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, location, date }),
      });
      if (response.ok) {
        console.log('Emergency data saved successfully');
        setName("");
        setPhone("");
        setLocation("");
        setDate("");
        setSubmitSuccess(true); // Set submit success state to true
        setSubmitError(false); // Reset submit error state
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 4000);
      } else {
        console.error('Failed to save emergency data');
        setSubmitError(true); // Set submit error state to true
        setSubmitSuccess(false); // Reset submit success state
      }
    } catch (error) {
      console.error('Error saving emergency data:', error);
      setSubmitError(true); // Set submit error state to true
      setSubmitSuccess(false); // Reset submit success state
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('./../../../assets/images/back1.jpg')}
          style={styles.loginImage} />
        <View style={{ padding: 20, paddingTop: 40 }}>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
            {/* <Text style={{ fontSize: 25, fontFamily: 'outfit', color: "white" }}>Emergency</Text> */}
          </TouchableOpacity>
        </View>
        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          <CalendarPicker
            value={date}
            onDateChange={(selectedDate) => setDate(selectedDate)}
            width={360}
            minDate={Date.now()}
            maxDate={Date.now()}
            todayBackgroundColor="grey"
            todayTextStyle={{ color: 'white' }}
            selectedDayColor="black"
            selectedDayTextColor="white"
            // onChangeText={setDate}
          />
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone No"
            value={phone}
            onChangeText={validatePhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
            <Text style={styles.buttonText}>Get Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, !isFormValid && { backgroundColor: 'grey' }]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          {/* Success and Error Messages */}
          {submitSuccess && (
            <Text style={styles.successMessage}>Form submitted successfully!</Text>
          )}
          {submitError && (
            <Text style={styles.errorMessage}>Failed to submit form. Please try again later.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginImage: {
    width: 450,
    height: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  calendarContainer: {
    backgroundColor: 'rgba(255, 255, 225, 0.9)',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 225, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'yellow',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: 'yellow',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '800',
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
});