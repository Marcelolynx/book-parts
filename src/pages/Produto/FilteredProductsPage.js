// src/pages/Produto/FilteredProductsPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../../components/ProductList.js';
import styled from 'styled-components';

const FilteredProductsPage = ({ addToCart }) => {
  const location = useLocation();
  const { filteredProducts, title } = location.state || { filteredProducts: [], title: 'Produtos' };

  console.log('FilteredProductsPage location:', location);
  console.log('FilteredProductsPage location.state:', location.state);
  console.log('Filtered products:', filteredProducts);

  return (
    <FilteredProductsContainer>
      <Title>{title}</Title>
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} addToCart={addToCart} />
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

const NoProductsMessage = styled.p`
  font-size: 1.2em;
  text-align: center;
`;

export default FilteredProductsPage;
