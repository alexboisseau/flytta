import React from 'react';
import { useTheme } from 'styled-components';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

import { Spacer } from '../../components/ui/spacer';
import { HomeScreen } from '../../screens/app/home/home.screen';
import { EventsShow } from '../../screens/app/events/events-show.screen';
import { EventsUpdate } from '../../screens/app/events/events-update.screen';
import { ProfileScreen } from '../../screens/app/profile/profile.screen';

const HomeStack = createStackNavigator();

export const HomeNavigator = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeIndex"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="EventsShow"
        component={EventsShow}
        options={({ route }) => ({
          title: route.params.event.name,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerLeft: (props) => (
            <Spacer position="left" size="md">
              <HeaderBackButton {...props} />
            </Spacer>
          ),
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="EventsUpdate"
        component={EventsUpdate}
        options={{
          title: 'Accueil',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
      <HomeStack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
        }}
      />
    </HomeStack.Navigator>
  );
};
