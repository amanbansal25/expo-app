import React from 'react';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { Appbar, Avatar, TouchableRipple, useTheme } from 'react-native-paper';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  
  // Determine the title based on current path
  const getAppbarTitle = () => {
    // Strip any leading slashes and extract the base path
    const path = pathname.split('/').filter(Boolean)[0] || 'Home';
    
    switch(path) {
      case 'Progress':
        return 'Progress Dashboard';
      case 'History':
        return 'Task History';
      default:
        return 'My App';
    }
  };

  const handleAvatarPress = () => {
    router.push('/Profile');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content 
          title={getAppbarTitle()} 
        />
        <TouchableRipple onPress={handleAvatarPress} rippleColor="rgba(0, 0, 0, .32)">
          <Avatar.Text 
            size={40} 
            label="AB" 
            style={{ backgroundColor: theme.colors.elevation.level2 }}
            labelStyle={{ color: theme.colors.onPrimary }}
          />
        </TouchableRipple>
      </Appbar.Header>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="Home"
          options={{
            title: 'Progress',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="History"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}