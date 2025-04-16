import React from "react";
import { ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import Card from '@/components/ui/Card';
import Chart from '@/components/ui/Chart';

const HomeRoute = () => {
  const horizontalCards = Array.from({ length: 6 });
  const verticalCards = Array.from({ length: 6 });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text variant="titleMedium" style={styles.sectionTitle}>Featured</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
        data={horizontalCards}
        keyExtractor={(_, index) => `horizontal-${index}`}
        renderItem={({ index }) => (
          <View style={styles.horizontalCard}>
             <Card />
          </View>
        )}
      />

      <Divider style={{ marginVertical: 20 }} />

      <Text variant="titleMedium" style={styles.sectionTitle}>All Cards</Text>
      <View style={styles.container}>
        {verticalCards.map((_, index) => (
          <View key={`vertical-${index}`} style={styles.box}>
            <Card />
          </View>
        ))}
      </View>

      <Divider style={{ marginVertical: 20 }} />

      <Text variant="titleMedium" style={styles.sectionTitle}>Analytics</Text>
      <Chart />

      <Divider style={{ marginVertical: 20 }} />

      <Text variant="titleMedium" style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityBox}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Text key={i} style={styles.text}>• Activity item #{i + 1}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  headerText: {
    marginTop: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: 10,
    marginLeft: 5,
  },
  horizontalScroll: {
    paddingHorizontal: 5,
    gap: 10,
  },
  horizontalCard: {
    width: 160,
    marginRight: 10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    rowGap: 10,
    columnGap: 10,
  },
  box: {
    width: '40%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  activityBox: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default HomeRoute;
