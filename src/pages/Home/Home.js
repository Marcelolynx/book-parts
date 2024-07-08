import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductList from '../../components/ProductList.js';
import SearchBar from '../../components/SearchBar.js';
import CategorySearch from '../../components/CategoriaSearch.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../api/firebase.mjs';

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
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      let productsRef = collection(db, 'produtos');
      if (selectedCategory) {
        productsRef = query(productsRef, where('categoriaId', '==', selectedCategory));
      }
      const snapshot = await getDocs(productsRef);
      const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };

    fetchProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter(product =>
    product.descricao.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HomeContainer>
      <BackgroundContainer>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </BackgroundContainer>
      <CategorySearch onCategorySelect={(category) => setSelectedCategory(category)} />
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </HomeContainer>
  );
};

export default Home;
