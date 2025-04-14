import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Avatar, Title, Caption, Text, Button, useTheme, Card, TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/'); // Redirect to login screen
    } catch (err) {
      console.log('Sign out error:', err);
    }
  };

  const takeProfilePicture = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to take a profile picture!');
      return;
    }
    
    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for profile picture
      quality: 0.7,   // Slightly compressed for better performance
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      // Here you would typically upload this image to your storage
      // uploadProfilePicture(result.assets[0].uri);
    }
  };

  // Alternative option to pick from gallery
  const pickProfilePicture = async () => {
    // Request library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to select a profile picture!');
      return;
    }
    
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
      // Here you would typically upload this image to your storage
      // uploadProfilePicture(result.assets[0].uri);
    }
  };

  // Function to show options for profile picture
  const handleProfilePicturePress = () => {
    // For a more complete solution, you could use a library like 
    // react-native-action-sheet to show options
    Alert.alert(
      "Update Profile Picture",
      "Choose an option",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: takeProfilePicture },
        { text: "Choose from Library", onPress: pickProfilePicture },
        
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.userInfoSection}>
            <TouchableRipple 
              onPress={handleProfilePicturePress}
              rippleColor="rgba(0, 0, 0, .32)"
            >
              {profileImage ? (
                <Avatar.Image
                  size={80}
                  source={{ uri: profileImage }}
                  style={{ backgroundColor: colors.primary }}
                />
              ) : (
                <Avatar.Text
                  size={80}
                  label="AB"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </TouchableRipple>
           
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