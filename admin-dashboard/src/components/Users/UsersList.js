import React from 'react';

export const UsersList = function ({ users, onDelete }) {
  return (
    <div>
      {users.map(user => {
        return (
          <div
            key={user.userUid}
            className="w-7/12 border mx-auto my-5 p-5 rounded shadow flex items-center justify-between"
          >
            <div>
              <p className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm antialiased">{user.email}</p>
              <p className="text-xs antialiased text-gray-500 mt-4">
                #{user.userUid.trim()}
              </p>
            </div>
            <div className="flex space-x-2 text-white">
              <button
                className="bg-red-500 rounded p-2 hover:bg-red-600"
                onClick={() => onDelete(user)}
              >
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
