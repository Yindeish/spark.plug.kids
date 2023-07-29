import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import { Ionicons } from '@expo/vector-icons';
import Notification from '../screens/Notification';
import Settings from '../screens/Settings';
import Payments from '../screens/Payments';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#efb810',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: [
          {
            display: "flex"
          },
          null
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home Page') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Payments') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'build' : 'build-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'bulb' : 'bulb-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
          <Tab.Screen name="Home Page" component={HomeScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Notification" component={Notification} options={{ headerShown: true }} />
          <Tab.Screen name="Payments" component={Payments} options={{ headerShown: true }} />
          <Tab.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
          <Tab.Screen name="Profile" component={Profile} options={{ headerShown: true }} />

      
    </Tab.Navigator>
  )
};
export default TabNavigator;