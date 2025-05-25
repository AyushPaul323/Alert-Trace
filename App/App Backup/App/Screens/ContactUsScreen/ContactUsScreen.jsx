import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

export default function ContactUsScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {
    // Check if the form is valid
    setIsFormValid(
      name.trim() !== '' &&
      phone.trim() !== '' &&
      email.trim() !== '' &&
      description.trim() !== '' &&
      error === ''
    );
  }, [name, phone, email,description, error]);

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

  const validateEmail = (input) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  const handleEmailChange = (input) => {
    setEmail(input);
    setIsValidEmail(validateEmail(input));
  };


  const handleSubmit = async () => {
    if (!isFormValid) {
      setError('Please fill out all fields correctly');
      return;
    }

    try {
      const response = await fetch('http://192.168.50.152:3002/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, description }),
      });
      if (response.ok) {
        console.log('Contact Form Submitted successfully');
        setName("");
        setEmail("");
        setPhone("");
        setDescription("");
        setSubmitSuccess(true); // Set submit success state to true
        setSubmitError(false);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 4000);
      } else {
        console.error('Failed to submit contact form');
        setSubmitError(true); // Set submit error state to true
        setSubmitSuccess(false);
        // Handle error
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitError(true); // Set submit error state to true
      setSubmitSuccess(false);
      // Handle error
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('./../../../assets/images/back1.jpg')}
          style={styles.loginImage} />
        <View style={{ padding: 20, paddingTop: 40, paddingBottom: 90 }}>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="white" />
            {/* <Text style={{fontSize:25,fontFamily:'outfit',color:"white"}}>Enquiry</Text> */}
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Contact Us</Text>
          </View>
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
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
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
          {!isValidEmail && <Text style={styles.errorText}>Please enter a valid email address</Text>}
          <TouchableOpacity
            style={[styles.submitButton, !isFormValid && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={!isFormValid}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          {submitSuccess && (
            <Text style={styles.successMessage}>Form submitted successfully! Thank You For Contacting Us.</Text>
          )}
          {submitError && (
            <Text style={styles.errorMessage}>Failed to submit form. Please try again later.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 20
  },
  loginImage: {
    width: 450,
    height: 1000,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
