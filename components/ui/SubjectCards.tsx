import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, ProgressBar, MD3Colors, Avatar } from 'react-native-paper';


const MyComponent = (props: any) => {
    const { subjectTitle, topics } = props;
    const avatarTitle = subjectTitle[0];
  return (<Card>
    <Card.Content>
      <View style={styles.cardContainer}>
        <Avatar.Text size={30} label={avatarTitle} />
        <Text variant="titleLarge">{subjectTitle}</Text>
     </View>  
     <View style={styles.topics}>
        <Text>{`${topics} topics`}</Text>
     </View>
    </Card.Content>
  </Card>)
};


const styles = StyleSheet.create({
  progress: {
    marginTop: 20,
  },
  cardContainer:{
    flexDirection:'row',
    gap: 10,
  },
  topics:{
    marginTop: 10, 
  }
});

export default MyComponent;