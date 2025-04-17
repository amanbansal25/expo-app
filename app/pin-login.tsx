import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function PinLoginScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  // Hardcoded PIN for demo purposes
  const CORRECT_PIN = '1234';

  const handlePinSubmit = () => {
    if (pin === CORRECT_PIN) {
      // Navigate to home screen after successful login
      router.replace('/Progress');
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const handleBackToLogin = () => {
    router.back(); // Return to the previous screen (login page)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PIN Login</Text>
      
      <TextInput
        label="Enter your PIN"
        mode="outlined"
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
        style={styles.input}
        left={<TextInput.Icon icon="numeric" />}
      />
      
      {error ? (
        <Text style={{ color: colors.error, marginBottom: 15 }}>
          {error}
        </Text>
      ) : null}
      
      <Button 
        mode="contained" 
        onPress={handlePinSubmit} 
        style={styles.button}
        disabled={pin.length !== 4}
      >
        Login
      </Button>
      
      <Button 
        mode="text" 
        onPress={handleBackToLogin} 
        style={styles.backButton}
      >
        Return to Email Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  backButton: {
    marginTop: 20,
  }
});