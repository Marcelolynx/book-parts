import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../api/firebase.mjs';
import * as S from './styles.js';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'categorias'));
      const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  return (
    <S.DashboardContainer>
      <S.Title>CATEGORIAS</S.Title>
      <S.ButtonContainer>
        <S.Button>Mostrar todos</S.Button>
        <S.SearchInput type="text" placeholder="O que você está procurando?" />
      </S.ButtonContainer>
      <S.CardContainer>
        {categories.map(category => (
          <S.Card key={category.id} imageUrl={category.imageUrl}>
            <S.Overlay>{category.nome}</S.Overlay>
          </S.Card>
        ))}
      </S.CardContainer>
    </S.DashboardContainer>
  );
};

export default Dashboard;
