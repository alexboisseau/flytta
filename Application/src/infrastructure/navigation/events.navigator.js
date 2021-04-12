import React from 'react';
import { Button } from 'react-native';
import { useTheme } from 'styled-components';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { EventsScreen } from '../../screens/app/events/events.screen';
import { Spacer } from '../../components/ui/spacer';

const EventsStack = createStackNavigator();

export const EventsNavigator = () => {
  const { colors } = useTheme();

  return (
    <EventsStack.Navigator
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <EventsStack.Screen
        name="Events"
        component={EventsScreen}
        options={{
          title: 'Evénements',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerRight: () => (
            <Spacer position="right" size="md">
              <Button
                onPress={() => alert('This is a button!')}
                title="+ Nouveau"
                color="#fff"
              />
            </Spacer>
          ),
        }}
      />
    </EventsStack.Navigator>
  );
};
