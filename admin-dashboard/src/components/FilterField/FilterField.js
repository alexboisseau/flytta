import React from 'react';
import './FilterField.css';

const FilterField = function ({
  name,
  value,
  onChange,
  onSearch,
  placeholder = '',
  type = 'text',
}) {
  return (
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
        className="rounded text-white w-2/12 flex items-center justify-center space-x-2"
        onClick={onSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span></span>Rechercher
      </button>
    </div>
  );
};

export default FilterField;
