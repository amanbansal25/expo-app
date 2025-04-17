import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

export default function VideoCoursesCarousel() {
  const theme = useTheme();
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.8;

  // Sample data with YouTube video IDs
  const courses = [
    {
      id: '1',
      title: 'Introduction to React Native',
      hours: 4.5,
      youtubeId: 'https://www.youtube.com/watch?v=2sKLcYtHVqs', // React Native tutorial
      thumbnail: 'https://img.youtube.com/vi/ur6I5m2nTvk/hqdefault.jpg'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      hours: 6,
      youtubeId: 'W6NZfCO5SIk', // JavaScript tutorial
      thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg'
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      hours: 3.5,
      youtubeId: 'c9Wg6Cb_YlU', // UI/UX tutorial 
      thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/hqdefault.jpg'
    },
    {
      id: '4',
      title: 'Firebase Integration',
      hours: 5,
      youtubeId: 'rQvOAnNvcNQ', // Firebase tutorial
      thumbnail: 'https://img.youtube.com/vi/rQvOAnNvcNQ/hqdefault.jpg'
    },
    {
      id: '5',
      title: 'State Management with Redux',
      hours: 7,
      youtubeId: 'poQXNp9ItL4', // Redux tutorial
      thumbnail: 'https://img.youtube.com/vi/poQXNp9ItL4/hqdefault.jpg'
    }
  ];

  const renderCourseItem = ({ item }) => {
    const youtubeUrl = `https://www.youtube.com/embed/${item.youtubeId}?playsinline=1`;
    // Use YouTube thumbnail URLs (format: https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg)
    
    return (
      <TouchableOpacity 
        style={[styles.cardContainer, { width: cardWidth }]}
        onPress={() => console.log(`Selected course: ${item.title}`)}
      >
        <Card style={styles.card}>
          <Card.Content style={styles.videoContainer}>
            <WebView
              source={{ uri: youtubeUrl }}
              style={styles.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}
            />
          </Card.Content>
          <Card.Content>
            <Title numberOfLines={2} style={styles.title}>{item.title}</Title>
            <View style={styles.infoContainer}>
              <Paragraph style={styles.hours}>
                {item.hours} {item.hours === 1 ? 'hour' : 'hours'} to complete
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={cardWidth + 20} // Card width + padding
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoContainer: {
    padding: 0,
    height: 180,
    marginBottom: 8,
  },
  video: {
    height: 180,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  hours: {
    color: '#666',
  }
});