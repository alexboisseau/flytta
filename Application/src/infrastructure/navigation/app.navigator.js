import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { EventsNavigator } from './events.navigator';
import { ProfileScreen } from '../../screens/app/account/profile.screen';
import { HomeScreen } from '../../screens/app/home/home.screen';

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
  const iconName =
    TAB_ICON[route.name === 'Evénements' ? 'Events' : route.name];
  return {
    tabBarIcon: tabBarIcon(iconName),
    tabBarLabel: () => null,
  };
};

export const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <AppTab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: '#fc9e39',
        inactiveTintColor: 'gray',
      }}
    >
      <AppTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
      <AppTab.Screen name="Evénements" component={EventsNavigator} />
      <AppTab.Screen name="Messages" component={() => null} />
      <AppTab.Screen name="Profile" component={ProfileScreen} />
    </AppTab.Navigator>
  );
};
