import React from 'react';

export const DatePicker = ({ name, date, onChange }) => {
  return <input type="date" name={name} value={date} onChange={onChange} />;
};
