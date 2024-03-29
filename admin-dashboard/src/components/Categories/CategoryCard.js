import React from 'react';
import useModal from '../../hooks/useModal';
import CategoryModal from './CategoryModal';
import TrashIcon from '../../assets/svgIcons/TrashIcon';
import EditIcon from '../../assets/svgIcons/EditIcon';

const CategoryCard = function ({ category, onDelete, onUpdate }) {
  const { isShowing, toggle } = useModal();

  return (
    <div className="w-7/12 border mx-auto my-5 p-5 rounded shadow flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold">{category.name}</p>
        <p
          className="text-xs p-1 rounded antialiased text-white mt-1"
          style={{
            backgroundColor: category.color,
          }}
        >
          {category.id}
        </p>
      </div>
      <div className="flex space-x-2 text-white">
        <button
          className="bg-red-500 rounded p-2 hover:bg-red-600 flex items-center justify-center space-x-2"
          onClick={() => onDelete(category)}
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

        <CategoryModal
          isShowing={isShowing}
          hide={toggle}
          category={category}
          onSubmit={onUpdate}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
