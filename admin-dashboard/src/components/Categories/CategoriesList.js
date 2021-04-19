import React from 'react';
import CategoryCard from './CategoryCard';

const CategoriesList = function ({ categories, onDelete, onUpdate }) {
  return (
    <div>
      {categories.map(category => {
        return (
          <CategoryCard
            category={category}
            onDelete={onDelete}
            onUpdate={onUpdate}
            key={category.id}
          />
        );
      })}
    </div>
  );
};

export default CategoriesList;
