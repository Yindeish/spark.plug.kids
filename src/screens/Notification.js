import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

export default Notifications = () => {
  const data = [
    {
      id: 3,
      name: 'March SoulLaComa',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
    {
      id: 2,
      name: 'John DoeLink',
      text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      attachment: '',
    },
  
  ];

  const [comments, setComments] = useState(data);

  return (
    <FlatList
      style={styles.root}
      data={comments}
      ItemSeparatorComponent={() => {
        return <View style={styles.separator} />;
      }}
      keyExtractor={item => {
        return item.id.toString();
      }}
      renderItem={({ item }) => {
        const Notification = item;
        let attachment = <View />;

        let mainContentStyle;
        if (Notification.attachment) {
          mainContentStyle = styles.mainContent;
          attachment = <View style={styles.attachment} />;
        }
        return (
          <TouchableOpacity style={styles.container}>
            <Ionicons name="person" size={50} color="#1E90FF" style={styles.avatar} />
            <View style={styles.content}>
              <View style={mainContentStyle}>
                <View style={styles.text}>
                  <Text style={styles.name}>{Notification.name}</Text>
                  <Text>{Notification.text}</Text>
                </View>
                <Text style={styles.timeAgo}>2 hours ago</Text>
              </View>
              {attachment}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    color: '#efb810',
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
    backgroundColor: '#CCCCCC',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
});
