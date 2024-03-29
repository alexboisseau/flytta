import React from 'react';
import useModal from '../../hooks/useModal';
import UserModal from './UserModal';
import TrashIcon from '../../assets/svgIcons/TrashIcon';
import EditIcon from '../../assets/svgIcons/EditIcon';

const UserCard = function ({ user, onDelete, onUpdate }) {
  const { isShowing, toggle } = useModal();

  return (
    <div className="w-7/12 border mx-auto my-5 p-5 rounded shadow flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm antialiased">{user.email}</p>
        <p className="text-sm antialiased text-gray-500">~ {user.city} ~</p>
        <p className="text-xs antialiased text-gray-500 mt-4">
          #{user.userId.trim()}
        </p>
      </div>
      <div className="flex space-x-2 text-white">
        <button
          className="bg-red-500 rounded p-2 hover:bg-red-600 flex items-center justify-center space-x-2"
          onClick={() => onDelete(user)}
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

        <UserModal
          isShowing={isShowing}
          hide={toggle}
          user={user}
          onSubmit={onUpdate}
        />
      </div>
    </div>
  );
};

export default UserCard;
