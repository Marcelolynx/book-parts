// src/components/ProductList.js

import React from 'react';
import styled from 'styled-components';

const ProductList = ({ products }) => {
  return (
    <ProductListContainer>
      {products.map(product => (
        <ProductCard key={product.id}>
          <ProductImage src={product.imagens[0]} alt={product.descricao} />
          <ProductInfo>
            <ProductTitle>{product.descricao}</ProductTitle>
            <ProductPrice>{product.valor}</ProductPrice>
          </ProductInfo>
        </ProductCard>
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px 10%;
`;

const ProductCard = styled.div`
  width: 220px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 1em;
  margin: 0;
`;

const ProductPrice = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: #000;
  margin: 5px 0 0;
`;

export default ProductList;
