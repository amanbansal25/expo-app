import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { DataTable, Button } from 'react-native-paper';
import { db } from '../../firebase';

const History = () => {
    const [listData, setListData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Tasks'));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListData(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const handleOnPress = () => {
      fetchData();
      setLoading(true)
    } 

    if(listData.length > 0){
      console.log('LIST DATA', listData);
    }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Button mode="contained" onPress={handleOnPress} loading={loading}> Get History Data </Button>
          <DataTable style={styles.table}>
          <DataTable.Header style={{flexDirection: 'row'}}>
            <DataTable.Title sortDirection='descending' style={{flex: 1}}>Id</DataTable.Title>
            <DataTable.Title style={{flex: 3}} >Task</DataTable.Title>
            <DataTable.Title  style={{flex: 1, justifyContent: 'flex-end'}}>Status</DataTable.Title>
          </DataTable.Header>

          {listData.sort((a:any,b:any) => a.id - b.id).map((item : any) => (
            <DataTable.Row style={{flexDirection: 'row'}} key={item.id}>
              <DataTable.Cell style={{flex: 1}}>{item.id}</DataTable.Cell>
              <DataTable.Cell numeric style={{flex: 3, justifyContent: 'flex-start'  }}>{item.task}</DataTable.Cell>
              <DataTable.Cell numeric style={{flex: 1}}>{item.status ? "Done" : "Pending"}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  table:{
    marginTop: 20,
  },
});

export default History;
