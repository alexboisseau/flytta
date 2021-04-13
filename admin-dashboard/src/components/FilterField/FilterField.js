import React from 'react';

// PAGES / COMPONENTS / STYLES
import './FilterField.css';

const FilterField = ({
  name,
  value,
  onChange,
  onSearch,
  placeholder = '',
  type = 'text',
}) => (
  <div className="flex w-8/12 mx-auto space-x-2">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={name}
      className="block p-3 border-2 border-gray-400 rounded w-10/12"
      value={value}
      onChange={onChange}
    />
    <button
      id="searchButton"
      className="rounded text-white w-2/12"
      onClick={onSearch}
    >
      Rechercher
    </button>
  </div>
);

export default FilterField;
