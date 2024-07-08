import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../api/firebase.mjs';
import styled from 'styled-components';
import CategoriaForm from '../../components/CategoriaForm.js';

const CategoriaFormPage = () => {
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    const querySnapshot = await getDocs(collection(db, 'categorias'));
    const categoriasData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCategorias(categoriasData);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <PageContainer>
      <h1>Cadastrar Categoria</h1>
      <CategoriaForm onAddCategoria={fetchCategorias} />
      <h2>Categorias Cadastradas</h2>
      <CategoriaList>
        {categorias.map((categoria) => (
          <CategoriaCard key={categoria.id}>
            <CategoriaImage src={categoria.imagemUrl} alt={categoria.nome} />
            <CategoriaName>{categoria.nome}</CategoriaName>
          </CategoriaCard>
        ))}
      </CategoriaList>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CategoriaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const CategoriaCard = styled.div`
  width: 230px;
  height: 328px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
`;

const CategoriaImage = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
`;

const CategoriaName = styled.div`
  padding: 10px;
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
`;

export default CategoriaFormPage;
