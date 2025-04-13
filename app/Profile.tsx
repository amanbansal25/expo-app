import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Text, Button, useTheme, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/'); // Redirect to login screen
    } catch (err) {
      console.log('Sign out error:', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.userInfoSection}>
            <Avatar.Text
              size={80}
              label="AB"
              style={{ backgroundColor: colors.primary }}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={styles.title}>Aman Bansal</Title>
              <Caption style={styles.caption}>@amanban</Caption>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>📍 Location:</Text>
            <Text style={styles.infoText}>Bangalore, Karnataka</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>📞 Phone:</Text>
            <Text style={styles.infoText}>+1 234 567 890</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>✉️ Email:</Text>
            <Text style={styles.infoText}>aman.b.25@gmail.com</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Sign Out */}
      <Button
        mode="contained-tonal"
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    padding: 10,
  },
  userInfoSection: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#333',
  },
  infoText: {
    color: '#555',
  },
  signOutButton: {
    marginTop: 30,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'center',
    width: '50%',
  },
});
