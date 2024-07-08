import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importando o ícone de carrinho de compras

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-bottom: 16px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductDetails = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
  color: #666;
`;

const ProductCode = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  color: #999;
`;

const ProductApplication = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #999;
`;

const Button = styled.button`
  margin: 8px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }

  svg {
    margin-right: 8px;
  }
`;

const ProductCard = ({ product, addToCart }) => {
  if (!product) {
    return null; // Verificação para garantir que o produto existe
  }

  return (
    <Card>
      <ProductImage src={product.imagens && product.imagens[0] ? product.imagens[0] : 'default-image.jpg'} alt={product.descricao} />
      <h3>{product.descricao}</h3>
      <p>Preço: ${product.preco}</p>
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </Card>
  );
};

export default ProductCard;
