import React, { useState, useCallback, useContext, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeArea } from '../../../components/utility/safe-area';
import { EventCard } from './components/event-card.component';
import { EventsList } from './components/events-list.styles';
import { Spacer } from '../../../components/ui/spacer';
import { Text } from '../../../components/ui/text';
import {
  getCreatedEventsRequest,
  getRegisteredEventsRequest,
} from '../../../services/events/events.service';
import { PaddingX } from './components/event-card.styles.js';
import { ButtonRed } from '../../../components/ui/button';
import { useFocusEffect } from '@react-navigation/native';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const EventsScreen = ({ navigation }) => {
  const [createdEvents, setCreatedEvents] = useState([]); // Events created by the current user
  const [registeredEvents, setRegisteredEvents] = useState([]); // Events to which the user is registered
  const [showCreateEvts, setShowCreateEvts] = useState(true);
  const [changeBtnValue, setChangeBtnValue] = useState(
    'Les évènements auxquels je suis inscrit'
  );
  const { user } = useContext(AuthenticationContext);

  const getCreatedEvents = async () => {
    setCreatedEvents([]);

    try {
      const events = await getCreatedEventsRequest(user.uid);
      setCreatedEvents(events);
    } catch (e) {
      console.error(e);
    }
  };

  const getRegisteredEvents = async () => {
    setCreatedEvents([]);

    try {
      let events = await getRegisteredEventsRequest(user.uid);
      events = events.filter((event) => event != null);
      setRegisteredEvents(events);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleShow = () => {
    setShowCreateEvts(showCreateEvts ? false : true);
    setChangeBtnValue(
      showCreateEvts
        ? 'Mes évènements créés'
        : 'Les évènements auxquels je suis inscrit'
    );
  };

  useFocusEffect(
    useCallback(() => {
      getCreatedEvents();
      getRegisteredEvents();
    }, [])
  );

  return (
    <SafeArea>
      <Spacer position="top" size="lg">
        <PaddingX>
          <ButtonRed onPress={toggleShow}>
            <Text color="white" bold center>
              {changeBtnValue}
            </Text>
          </ButtonRed>
        </PaddingX>
      </Spacer>
      <EventsList
        data={showCreateEvts ? createdEvents : registeredEvents}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EventsShow', {
                event: item,
                redirectScreen: 'EventsUsers',
              })
            }
          >
            <Spacer position="bottom" size="md">
              <EventCard event={item} />
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(event) => event.id}
      />
    </SafeArea>
  );
};
