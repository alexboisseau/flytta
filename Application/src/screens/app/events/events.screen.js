import React from 'react';
import { SafeArea } from '../../../components/utility/safe-area';
import { EventCard } from './components/event-card.component';
import { EventsList } from './components/events-list.styles';
import { Spacer } from '../../../components/ui/spacer';

export const EventsScreen = ({ navigation }) => {
  const events = [
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
  ];

  return (
    <SafeArea>
      <EventsList
        data={events}
        renderItem={({ item }) => (
          <Spacer position="bottom" size="md">
            <EventCard event={item} />
          </Spacer>
        )}
        keyExtractor={(event) => event.uid}
      />
    </SafeArea>
  );
};
