import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const ProductList = ({ products, addToCart }) => (
  <GridContainer>
    {products.map(product => (
      <ProductCard key={product.codigo} product={product} addToCart={addToCart} />
    ))}
  </GridContainer>
);

export default ProductList;
