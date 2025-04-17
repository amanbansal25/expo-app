import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { Video, ResizeMode } from 'expo-av';

export default function VideoCoursesCarousel() {
  const theme = useTheme();
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.8;

  // Sample data for courses
  const courses = [
    {
      id: '1',
      title: 'Introduction to React Native',
      hours: 4.5,
      videoUri: 'https://example.com/videos/react-native-intro.mp4',
      thumbnail: 'https://example.com/thumbnails/react-native.jpg'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Concepts',
      hours: 6,
      videoUri: 'https://example.com/videos/advanced-js.mp4',
      thumbnail: 'https://example.com/thumbnails/javascript.jpg'
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      hours: 3.5,
      videoUri: 'https://example.com/videos/uiux-design.mp4',
      thumbnail: 'https://example.com/thumbnails/uiux.jpg'
    },
    {
      id: '4',
      title: 'Firebase Integration',
      hours: 5,
      videoUri: 'https://example.com/videos/firebase.mp4',
      thumbnail: 'https://example.com/thumbnails/firebase.jpg'
    },
    {
      id: '5',
      title: 'State Management with Redux',
      hours: 7,
      videoUri: 'https://example.com/videos/redux.mp4',
      thumbnail: 'https://example.com/thumbnails/redux.jpg'
    }
  ];

  const renderCourseItem = ({ item  }) => {
    return (
      <TouchableOpacity 
        style={[styles.cardContainer, { width: cardWidth }]}
        onPress={() => console.log(`Selected course: ${item.title}`)}
      >
        <Card style={styles.card}>
          <Card.Content style={styles.videoContainer}>
          <Video
            source={{ uri: item.videoUri }}
            posterSource={{ uri: item.thumbnail }}
            usePoster={true}
            resizeMode={ResizeMode.COVER}  // Use the enum value instead of string
            useNativeControls
            style={styles.video}
            posterStyle={styles.poster}
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
    marginBottom: 8,
  },
  video: {
    height: 180,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  poster: {
    resizeMode: 'cover',
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