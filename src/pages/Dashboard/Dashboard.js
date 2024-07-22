import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../api/firebase.mjs';
import * as S from './styles.js';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'categorias'));
      const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    };

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    const filtered = products.filter(product => product.categoriaId === categoryId);
    console.log('Category clicked:', categoryName);
    console.log('Filtered products:', filtered);
    navigate('/filtro-produtos', { state: { filteredProducts: filtered, title: categoryName } });
  };

  const handleShowAllClick = () => {
    console.log('Showing all products:', products);
    navigate('/filtro-produtos', { state: { filteredProducts: products, title: 'Todos os Produtos' } });
  };

  return (
    <S.DashboardContainer>
      <S.Title>CATEGORIAS</S.Title>
      <S.ButtonContainer>
        <S.Button onClick={handleShowAllClick}>Mostrar todos</S.Button>
        <S.SearchInput type="text" placeholder="O que você está procurando?" />
      </S.ButtonContainer>
      <S.CardContainer>
        {categories.map(category => (
          <S.Card key={category.id} imageUrl={category.imagemUrl} onClick={() => handleCategoryClick(category.id, category.nome)}>
            <S.Overlay>{category.nome}</S.Overlay>
          </S.Card>
        ))}
      </S.CardContainer>
    </S.DashboardContainer>
  );
};

export default Dashboard;
