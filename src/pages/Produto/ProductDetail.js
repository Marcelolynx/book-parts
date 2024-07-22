import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import productsData from '../../data/produtos.json';

const ProductDetailContainer = styled.div`
  padding: 16px;
  text-align: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-bottom: 16px;
`;

const ProductDetail = ({ addToCart }) => {
  const { codigo } = useParams();
  const product = productsData.find(p => p.codigo === codigo);

  if (!product) {
    return <p>Produto não encontrado!</p>;
  }

  return (
    <ProductDetailContainer>
      {product.imagens.map((img, index) => (
        <ProductImage key={index} src={img} alt={product.descricao} />
      ))}
      <h2>{product.descricao}</h2>
      <p>Preço: R${product.valor}</p>
      <p>Código: {product.codigo}</p>
      <p>Aplicação: {product.aplicacoes}</p>
      <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
