import React from 'react';
import UserCard from './UserCard';

export const UsersList = function ({ users, onDelete, onUpdate }) {
  return (
    <div>
      {users.map(user => {
        return (
          <UserCard
            user={user}
            onDelete={onDelete}
            onUpdate={onUpdate}
            key={user.userId}
          />
        );
      })}
    </div>
  );
};
