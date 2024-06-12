import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px 15px;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  box-shadow: none;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #c6c6c6;
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }
`;

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar produtos..."
      />
    </SearchContainer>
  );
};

export default SearchBar;
