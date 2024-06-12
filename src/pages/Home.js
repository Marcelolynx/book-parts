import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import productsData from '../data/produtos.json';
import SearchBar from '../components/SearchBar';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BackgroundContainer = styled.div`
  width: 100%;
  height: 300px;
  background-image: url('/data/img/topo-busca.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filteredProducts = products.filter(product =>
    product.descricao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HomeContainer>
      <BackgroundContainer>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </BackgroundContainer>
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </HomeContainer>
  );
};

export default Home;
