import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';


const MyComponent = () => (
<View style={styles.chartWrapper}>
   <Text variant="titleLarge" style={styles.text}>Progress Chart</Text>
    <Card style={styles.chart}>
            <Image style={{width:'100%', height:200, borderRadius: 20, }} source={{uri:'https://trendspider.com/learning-center/wp-content/uploads/2023/06/Japanese-Candlestick-Pattern-min.jpg'}} />
    </Card>
</View>
);

const styles = StyleSheet.create({
   chartWrapper:{
    padding: 10,
   },
   text:{
    marginLeft:10
   },
   chart:{
    marginTop: 10,
    borderRadius: 20,
   }
  });


export default MyComponent;