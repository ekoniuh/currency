import React from 'react';

export const Select = ({ options, defaultValue, name, id, onChange }) => {
  return (
    <select value={name} id={id} onChange={onChange}>
      <option value={name} id={id}>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.name} id={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
