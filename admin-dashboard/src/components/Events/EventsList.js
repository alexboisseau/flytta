import React from 'react';
import EventCard from './EventCard';

export const EventsList = function ({ events, onDelete, onUpdate }) {
  return (
    <div>
      {events.map(event => {
        return (
          <EventCard
            event={event}
            onDelete={onDelete}
            onUpdate={onUpdate}
            key={event.eventId}
          />
        );
      })}
    </div>
  );
};
