import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ProductList = ({ products, addToCart, cartItems = [] }) => {
  const [clicked, setClicked] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setClicked(product.id);
    setTimeout(() => setClicked(null), 1000); // Remove a classe após 1 segundo
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <ProductListContainer>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={product.imagens[0]} alt={product.descricao} />
          <ProductInfo>
            <ProductTitle>{product.descricao}</ProductTitle>
            <ProductPrice>R${product.valor}</ProductPrice>
          </ProductInfo>
          <AddToCartButton 
            onClick={() => handleAddToCart(product)} 
            className={clicked === product.id ? 'clicked' : ''}
            isInCart={isInCart(product.id)}
          >
            {isInCart(product.id) ? 'Adicionado' : 'Adicionar ao Carrinho'}
          </AddToCartButton>
        </ProductCard>
      ))}
    </ProductListContainer>
  );
};

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 220px;
  padding: 10px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProductInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 1em;
  color: #333;
`;

const clickAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const AddToCartButton = styled.button`
  padding: 10px 0;
  background-color: ${({ isInCart }) => (isInCart ? '#1CB76F' : '#000')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }

  &.clicked {
    animation: ${clickAnimation} 0.5s ease-in-out;
  }
`;

export default ProductList;
