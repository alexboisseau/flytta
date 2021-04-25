import React from 'react';

const Input = function ({
  name,
  type,
  placeholder = '',
  value,
  onChange,
  className,
  label,
  classNameLabel,
}) {
  return (
    <>
      {label ? (
        <label className={classNameLabel} name={name}>
          {label}
        </label>
      ) : null}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={event => onChange(event)}
      />
    </>
  );
};

export default Input;
