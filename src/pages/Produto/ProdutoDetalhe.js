import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/firebase.mjs';
import styled from 'styled-components';

const ProductDetail = ({ addToCart }) => {
  const { codigo } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'produtos', codigo);
      const productDoc = await getDoc(productRef);
      if (productDoc.exists()) {
        setProduct(productDoc.data());
      } else {
        console.error('Produto não encontrado');
      }
    };

    fetchProduct();
  }, [codigo]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ImagesContainer>
        {product.imagens.map((image, index) => (
          <ProductImage key={index} src={image} alt={product.descricao} />
        ))}
      </ImagesContainer>
      <DetailsContainer>
        <h1>{product.descricao}</h1>
        <p><strong>Código:</strong> {product.codigo}</p>
        <p><strong>Código OEM:</strong> {product.codigo_oem}</p>
        <p><strong>Valor:</strong> R${product.valor}</p>
        <p><strong>Categoria:</strong> {product.categoria}</p>
        <p><strong>Marca:</strong> {product.marca}</p>
        <p><strong>Aplicações:</strong> {product.aplicacoes}</p>
        <Button onClick={() => addToCart(product)}>Adicionar ao Carrinho</Button>
      </DetailsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #f8f8f8;
`;

const ImagesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const DetailsContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #333;
  }
`;

export default ProductDetail;
