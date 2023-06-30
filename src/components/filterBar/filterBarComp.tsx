import React, { ChangeEvent } from 'react';
import './style.css'

type TextInputProps = {
  searchValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: React.FC<TextInputProps> = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Type your search"
    />
  );
};
