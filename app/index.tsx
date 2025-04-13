import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase'; // Adjust path as needed

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      router.push('/Progress');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('Login failed:', err.message);
        setError('Invalid credentials. Please try again.');
      } else {
        setError('Unexpected error occurred.');
      }
    }
  };

  const handleSignupRedirect = () => {
    router.push('/Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
        style={styles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={secureText}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={secureText ? 'eye-off' : 'eye'}
            onPress={() => setSecureText(!secureText)}
          />
        }
        style={styles.input}
      />

      {error ? <Text style={{ color: colors.error, marginBottom: 10 }}>{error}</Text> : null}

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>

      <Button mode="text" onPress={handleSignupRedirect} style={styles.signupButton}>
        Don’t have an account? Sign Up
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
    fontSize: 32,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  signupButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
