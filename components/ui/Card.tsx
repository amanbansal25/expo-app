import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, MD3Colors } from 'react-native-paper';


const MyComponent = () => (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">Sample Card</Text>
      <Text variant="bodyMedium">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint dicta vel tempore blanditiis dolorem,</Text>
      <ProgressBar style={styles.progress} progress={0.5} color={MD3Colors.error50} />
    </Card.Content>
  </Card>
);


const styles = StyleSheet.create({
  progress: {
    marginTop: 20,
  }
});

export default MyComponent;