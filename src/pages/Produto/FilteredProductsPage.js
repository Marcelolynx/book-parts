import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductList from '../../components/ProductList.js';
import styled from 'styled-components';

const FilteredProductsPage = ({ addToCart, cartItems }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredProducts, title, allProducts } = location.state || { filteredProducts: [], title: 'Produtos', allProducts: [] };

  const [searchTerm, setSearchTerm] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState(filteredProducts);

  const handleShowAllClick = () => {
    setDisplayedProducts(allProducts);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === '') {
      setDisplayedProducts(filteredProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.descricao.toLowerCase().includes(term.toLowerCase())
      );
      setDisplayedProducts(filtered);
    }
  };

  return (
    <FilteredProductsContainer>
      <Title>{title}</Title>
      <ButtonContainer>
        <Button onClick={handleShowAllClick}>Mostrar todos</Button>
        <SearchInput 
          type="text" 
          placeholder="O que você está procurando?" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </ButtonContainer>
      {displayedProducts.length > 0 ? (
        <ProductList products={displayedProducts} addToCart={addToCart} cartItems={cartItems} />
      ) : (
        <NoProductsMessage>Nenhum produto encontrado.</NoProductsMessage>
      )}
    </FilteredProductsContainer>
  );
};

const FilteredProductsContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  padding: 0 10%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10%;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-left: 10px;

  &:hover {
    background-color: #333;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 320px;
  font-size: 1em;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const NoProductsMessage = styled.p`
  font-size: 1.2em;
  text-align: center;
`;

export default FilteredProductsPage;
