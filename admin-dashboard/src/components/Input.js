import React from 'react';

const Input = props => {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      className="block mb-1 p-2 rounded w-80 text-black"
      value={props.value}
      onChange={event => props.onChange(event)}
    />
  );
};

export default Input;
