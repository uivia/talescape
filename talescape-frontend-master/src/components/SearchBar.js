// src/components/SearchBar.js
import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search for a book..."
      value={searchTerm}
      onChange={onSearchChange}
    />
  );
};

export default SearchBar;