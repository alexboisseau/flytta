import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { EventsNavigator } from './events.navigator';
import { HomeNavigator } from './home.navigator';
import { ProfileNavigator } from './profile.navigator';
import { ChatNavigator } from './chat.navigator';

const TAB_ICON = {
  Home: 'ios-home',
  Events: 'ios-calendar',
  Messages: 'ios-chatbubble-ellipses',
  Profile: 'ios-person-circle',
};

const AppTab = createBottomTabNavigator();

const tabBarIcon = (iconName) => ({ focused, color, size }) => (
  <Ionicons
    name={focused ? iconName : `${iconName}-outline`}
    size={size}
    color={color}
  />
);

const createScreenOptions = ({ route }) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  const iconName =
    TAB_ICON[route.name === 'Evénements' ? 'Events' : route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),
    tabBarLabel: () => null,
    tabBarVisible: routeName === 'ChatConversation' ? false : true,
  };
};

export const AppNavigator = () => {
  return (
    <AppTab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: '#fc9e39',
        inactiveTintColor: 'gray',
      }}
    >
      <AppTab.Screen name="Home" component={HomeNavigator} />
      <AppTab.Screen name="Events" component={EventsNavigator} />
      <AppTab.Screen name="Messages" component={ChatNavigator} />
      <AppTab.Screen name="Profile" component={ProfileNavigator} />
    </AppTab.Navigator>
  );
};
