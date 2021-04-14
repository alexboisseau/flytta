import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { SafeArea } from '../../../components/utility/safe-area';
import { Spacer } from '../../../components/ui/spacer';
import { EventsList } from '../events/components/events-list.styles';
import { EventCard } from '../events/components/event-card.component';
import { getEventsRequest } from '../../../services/events/events.service';
import { Spinner } from '../../../components/ui/spinner';

export const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);

  const getEvents = async () => {
    setEvents([]);
    setIsEventsLoading(true);

    try {
      const evts = await getEventsRequest();
      setEvents(evts);
      setIsEventsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getEvents();
    }, [])
  );

  return (
    <SafeArea>
      {isEventsLoading ? (
        <Spinner />
      ) : (
        <EventsList
          data={events}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('EventsShow', { event: item })}
            >
              <Spacer position="bottom" size="md">
                <EventCard event={item} />
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(event) => event.id}
        />
      )}
    </SafeArea>
  );
};
