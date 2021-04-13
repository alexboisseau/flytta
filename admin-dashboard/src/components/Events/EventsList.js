import React from 'react';

export const EventsList = function ({ events }) {
  return (
    <div>
      {events.map(event => {
        return (
          <div
            key={event.eventUid}
            className="w-7/12 border mx-auto my-5 p-5 rounded shadow flex items-center justify-between"
          >
            <div>
              <p className="text-2xl font-semibold">{event.name}</p>
              <span className="text-sm p-1 rounded bg-gray-200">
                {event.category.name}
              </span>
              <p className="text-xs antialiased text-gray-500 mt-4">
                #{event.eventUid.trim()}
              </p>
            </div>
            <div className="flex space-x-2 text-white">
              <button className="bg-red-500 rounded p-2 hover:bg-red-600">
                Supprimer
              </button>
              <button className="bg-blue-500 rounded p-2 hover:bg-blue-600">
                Modifier
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
