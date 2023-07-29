import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert, FlatList, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';

const data = [
  { id: 1, day: 1, month: 'Sep' },
  { id: 2, day: 2, month: 'Jan' },
  { id: 3, day: 3, month: 'Aug' },
  { id: 4, day: 4, month: 'Dec' },
  { id: 5, day: 5, month: 'Jul' },
]

export default EventsView = () => {
  const [eventList, setEventList] = useState(data)
  const [newEvent, setNewEvent] = useState({ day: '', month: '' });


  showAlert = viewId => {
    Alert.alert('alert', 'event clicked ' + viewId)
  }
  const addEvent = () => {
    if (newEvent.day && newEvent.month) {
      const id = eventList.length + 1;
      const updatedEventList = [...eventList, { ...newEvent, id }];
      setEventList(updatedEventList);
      setNewEvent({ day: '', month: '' });
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>UPCOMING CLASSES</Text>
      <FlatList
        enableEmptySections={true}
        style={styles.eventList}
        data={eventList}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => showAlert('row')}>
              <View style={styles.eventBox}>
                <View style={styles.eventDate}>
                  <Text style={styles.eventDay}>{item.day}</Text>
                  <Text style={styles.eventMonth}>{item.month}</Text>
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTime}>10:00 am - 10:45 am</Text>
                  <Text style={styles.userName}>Teacher: John Doe</Text>
                  <Text style={styles.description}>
                   Topic: Lorem ipsum dolor sit amet, elit consectetur
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC',
  },
  heading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#0099FF',
  },
  eventList: {
    marginTop: 20,
  },
  eventBox: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  eventDate: {
    flexDirection: 'column',
  },
  eventDay: {
    fontSize: 50,
    color: '#0099FF',
    fontWeight: '600',
  },
  eventMonth: {
    fontSize: 16,
    color: '#0099FF',
    fontWeight: '600',
  },
  eventContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  eventTime: {
    fontSize: 18,
    color: '#151515',
  },
  userName: {
    fontSize: 16,
    color: '#151515',
  },
})