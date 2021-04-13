import React, { useEffect, useState } from 'react';

import { SafeArea } from '../../../components/utility/safe-area';
import { Spacer } from '../../../components/ui/spacer';
import { EventsList } from '../events/components/events-list.styles';
import { EventCard } from '../events/components/event-card.component';
import { getEventsRequest } from '../../../services/events/events.service';
import { ActivityIndicator } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const [events, setEvents] = useState([
    {
      uid: 'a',
      name: 'Football',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Amateur',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Football', color: '#10B981' },
    },
    {
      uid: 'b',
      name: 'lol2',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Intermédiaire',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Course à pied', color: '#6366F1' },
    },
    {
      uid: 'b',
      name: 'lol2',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Avancé',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Boxe', color: '#F59E0B' },
    },
    {
      uid: 'a',
      name: 'Football',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Amateur',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Football', color: '#10B981' },
    },
    {
      uid: 'b',
      name: 'lol2',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Intermédiaire',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Course à pied', color: '#6366F1' },
    },
    {
      uid: 'b',
      name: 'lol2',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Avancé',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Boxe', color: '#F59E0B' },
    },
    {
      uid: 'a',
      name: 'Football',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Amateur',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Football', color: '#10B981' },
    },
    {
      uid: 'b',
      name: 'lol2',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Intermédiaire',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Course à pied', color: '#6366F1' },
    },
    {
      uid: 'b',
      name: 'lol2',
      startDate: '21 mars 2000',
      duration: '60',
      level: 'Avancé',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, beatae.',
      creator: { fullName: 'Thomas Le Naour' },
      category: { name: 'Boxe', color: '#F59E0B' },
    },
  ]);
  const [isEventsLoading, setIsEventsLoading] = useState(false);

  // const getEvents = async () => {
  //   setEvents([]);
  //   setIsEventsLoading(true);

  //   try {
  //     const evts = await getEventsRequest();
  //     setEvents(evts);
  //     setIsEventsLoading(false);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   getEvents();
  // }, []);

  console.log('events', events);

  return (
    <SafeArea>
      {isEventsLoading ? (
        <ActivityIndicator />
      ) : (
        <EventsList
          data={events}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="md">
              <EventCard event={item} />
            </Spacer>
          )}
          keyExtractor={(event) => event.uid}
        />
      )}
    </SafeArea>
  );
};
