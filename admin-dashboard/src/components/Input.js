import React from 'react';

const Input = ({ name, type, placeholder, value, onChange }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="block mb-1 p-2 rounded w-80 text-black"
      value={value}
      onChange={event => onChange(event)}
    />
  );
};

export default Input;
