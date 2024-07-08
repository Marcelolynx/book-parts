import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/ProdutoForm.js';
import ProductTable from '../../components/ProdutoTable.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../api/firebase.mjs';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 0 10%;
`;

const Title = styled.h1`
  padding: 0 10%;
`;

const Subtitle = styled.h2`
  padding: 0 10%;
`;

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const productsRef = collection(db, 'produtos');
    const snapshot = await getDocs(productsRef);
    const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsList);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  return (
    <PageContainer>
      <Title>Produtos</Title>
      <Subtitle>Cadastro de Produtos</Subtitle>
      <ProductForm 
        currentProduct={currentProduct} 
        setCurrentProduct={setCurrentProduct} 
        fetchProducts={fetchProducts} 
      />
      <Subtitle>Lista de Produtos</Subtitle>
      <ProductTable 
        products={products} 
        onEdit={handleEdit} 
        fetchProducts={fetchProducts} 
      />
    </PageContainer>
  );
};

export default Admin;
