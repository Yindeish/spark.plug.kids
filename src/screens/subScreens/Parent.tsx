import React from 'react';
import { Text } from 'react-native-paper';
import EventsView from '../../components/Events';

const Parent = () => {
  return (
    <>
    <Text>Parent</Text>
    <EventsView />
    </>
  )
}

export default Parent