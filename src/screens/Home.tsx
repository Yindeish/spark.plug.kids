import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { IconButton, Text, Menu, Divider,FAB, Tooltip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpcomingClass from '../components/Upcoming';
import ToggleButton from '../components/ToggleButton';
import { useStore } from '../components/store';
import EventsView from '../components/Events';
import TabViewExample from './Settings';
// SubScreeens
import Teacher from './subScreens/Teacher';
import Admin from './subScreens/Admin';
import Parent from './subScreens/Parent';

interface HomeScreenProps {
  navigation: {
    navigate: (arg0: string) => void;
  };
}

enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT'
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { loggedInUser: user } = useStore();
  const [visible, setVisible] = useState(false);
 
  console.log('from home ', user.role);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <>
        <View style={styles.contentContainer}>
        {user && (
          <Text style={styles.welcomeText}>
            Welcome, {user.firstName} {user.lastName}!
          </Text>
        )}
        <View style={styles.menuContainer}>
          <Menu visible={visible} onDismiss={closeMenu} anchor={<IconButton icon="account-circle" size={30} onPress={openMenu} />}>
            <Menu.Item leadingIcon='account' onPress={goToProfile} title="Profile" />
            <Divider />
            <Menu.Item leadingIcon='message' onPress={() => { }} title="Message" />
            <Divider />
            <Menu.Item leadingIcon='account-arrow-left' onPress={() => { }} title="Log Out" />
          </Menu>
        </View>
      </View>
      {user.role == Role.TEACHER && <Teacher />}
      {user.role == Role.ADMIN && <Admin />}
      {user.role == Role.PARENT && <Parent />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    margin: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'flex-end',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: "flex-end",
  },
  welcomeText: {
    fontWeight: 'bold',
    marginRight: 4,
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
