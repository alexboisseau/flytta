import React from 'react';
import useModal from '../../hooks/useModal';
import EventModal from './Modal/EventModal';

// STYLES / COMPONENTS / PAGES
import TrashIcon from '../../assets/svgIcons/TrashIcon';
import EditIcon from '../../assets/svgIcons/EditIcon';

const EventCard = ({ event, onDelete, onUpdate }) => {
  const { isShowing, toggle } = useModal();

  return (
    <div className="w-7/12 border mx-auto my-5 p-5 rounded shadow flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold">{event.name}</p>
        <span
          className="text-sm p-1 rounded text-white"
          style={{ backgroundColor: event.category.color }}
        >
          {event.category.name}
        </span>
        <p className="text-sm antialiased text-gray-500 mt-1">
          À {event.city} | {event.address}
        </p>
        <p className="text-xs antialiased text-gray-500 mt-4">
          #{event.eventId.trim()}
        </p>
      </div>
      <div className="flex space-x-2 text-white">
        <button
          className="bg-red-500 rounded p-2 hover:bg-red-600 flex items-center justify-center space-x-2"
          onClick={() => onDelete(event)}
        >
          <TrashIcon></TrashIcon>
          <span>Supprimer</span>
        </button>
        <button
          className="bg-blue-500 rounded p-2 hover:bg-blue-600 flex items-center justify-center space-x-2"
          onClick={toggle}
        >
          <EditIcon></EditIcon>
          <span>Modifier</span>
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
