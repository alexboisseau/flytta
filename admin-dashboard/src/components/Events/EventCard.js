import React from 'react';
import useModal from '../../hooks/useModal';
import EventModal from './Modal/EventModal';

const EventCard = ({ event, onDelete, onUpdate }) => {
  const { isShowing, toggle } = useModal();

  return (
    <div className="w-7/12 border mx-auto my-5 p-5 rounded shadow flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold">{event.name}</p>
        <span className="text-sm p-1 rounded bg-gray-200">
          {event.category.name}
        </span>
        <p className="text-sm antialiased text-gray-500 mt-1">
          À {event.city} | {event.address}
        </p>
        <p className="text-xs antialiased text-gray-500 mt-4">
          #{event.eventId.trim()}
        </p>
      </div>
      <div className="flex flex-col space-y-1 text-white">
        <button
          className="bg-red-500 rounded p-2 hover:bg-red-600"
          onClick={() => onDelete(event)}
        >
          Supprimer
        </button>
        <button
          className="bg-blue-500 rounded p-2 hover:bg-blue-600"
          onClick={toggle}
        >
          Modifier
        </button>
      </div>
      <EventModal
        isShowing={isShowing}
        hide={toggle}
        event={event}
        onSubmit={onUpdate}
      />
    </div>
  );
};

export default EventCard;
