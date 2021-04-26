import React from 'react';
import { Button } from 'react-native';
import { useTheme } from 'styled-components';
import {
  createStackNavigator,
  HeaderBackButton,
} from '@react-navigation/stack';

import { EventsScreen } from '../../screens/app/events/events.screen';
import { EventsCreate } from '../../screens/app/events/events-create.screen';
import { EventsShow } from '../../screens/app/events/events-show.screen';
import { Spacer } from '../../components/ui/spacer';

const EventsStack = createStackNavigator();

export const EventsNavigator = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="EventsUsers"
        component={EventsScreen}
        options={{
          title: 'Evénements',
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          headerRight: () => (
            <Spacer position="right" size="md">
              <Button
                onPress={() => navigation.navigate('EventsCreate')}
                title="+ Nouveau"
                color="#fff"
              />
            </Spacer>
          ),
        }}
      />
      <EventsStack.Screen
        name="EventsCreate"
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: 'white',
          title: 'Créer un événement',
          headerLeft: (props) => (
            <Spacer position="left" size="md">
              <HeaderBackButton {...props} />
            </Spacer>
          ),
          headerBackTitleVisible: false,
        }}
        component={EventsCreate}
      />
      <EventsStack.Screen
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
    </EventsStack.Navigator>
  );
};
