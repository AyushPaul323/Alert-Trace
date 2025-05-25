import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentPositionAsync } from 'expo-location';

export default function EnquiryScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect(() => {
  //   const isValid = name && isPhoneValid && location && selectedOption && description && date;
  //   setIsFormValid(isValid);
  // }, [name, isPhoneValid, location, selectedOption, description,date]);
  useEffect(() => {
    // Check if the form is valid
    setIsFormValid(
      name.trim() !== '' &&
      phone.trim() !== '' &&
      location.trim() !== '' &&
      selectedOption.trim() !== '' &&
      description.trim() !== '' &&
      date !== '' &&
      error === ''
    );
  }, [name, phone, location, selectedOption,description,date, error]);

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
      setIsPhoneValid(true);
    } else {
      setError('Please enter a valid Indian phone number');
      setIsPhoneValid(false);
    }
    setPhone(phone);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      setError('Please fill out all fields correctly');
      return;
    }

    try {
      const response = await fetch('http://192.168.50.152:3000/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, location, selectedOption, description, date }),
      });
      if (response.ok) {
        console.log('Enquiry data saved successfully');
        setName('');
        setPhone('');
        setLocation('');
        setSelectedOption('');
        setDescription('');
        setSubmitSuccess(true); // Set submit success state to true
        setSubmitError(false);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 4000);
      } else {
        console.error('Failed to save enquiry data');
        setSubmitError(true); // Set submit error state to true
        setSubmitSuccess(false);
        // Handle error
      }
    } catch (error) {
      console.error('Error saving enquiry data:', error);
      setSubmitError(true); // Set submit error state to true
      setSubmitSuccess(false);
      // Handle error
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('./../../../assets/images/back1.jpg')}
          style={styles.loginImage} />
        <View style={{ padding: 20, paddingTop: 40 }}>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
            {/* <Text style={{ fontSize: 25, fontFamily: 'outfit', color: "white" }}>Enquiry</Text> */}
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
          <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
            <Text style={styles.buttonText}>Get Current Location</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={selectedOption}
            onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
            style={styles.input}>
            <Picker.Item label="Select Problem" value="" />
            <Picker.Item label="Accident Prone Zone" value="accident" />
            <Picker.Item label="Potholes" value="potholes" />
            {/* Add more options as needed */}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline={true} // Allow multiline input
            numberOfLines={4} // Set the number of lines to display initially
            textAlignVertical="top" // Align text to top of input field
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.submitButton, !isFormValid && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isFormValid}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
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
    borderRadius: 20,
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
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 1,
    //alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end'
  },
  buttonText: {
    fontSize: 12,
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
  disabledButton: {
    backgroundColor: 'gray',
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