import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../api/firebase.mjs';
import * as S from './styles.js';
import ProductList from '../../components/ProductList.js'; // Novo componente para listar produtos

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryMap, setCategoryMap] = useState({}); // Mapa de categorias para busca rápida

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'categorias'));
      const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);

      // Criar um mapa de categorias para facilitar a busca por ID
      const categoryMap = {};
      categoriesData.forEach(category => {
        categoryMap[category.id] = category.nome;
      });
      setCategoryMap(categoryMap);
    };

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setFilteredProducts(productsData); // Mostrar todos os produtos inicialmente
      console.log("Fetched products:", productsData); // Adicionando log para verificar os produtos
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryClick = (categoryName) => {
    console.log("Category clicked:", categoryName);
    const filtered = products.filter(product => categoryMap[product.categoriaId] === categoryName);
    console.log("Filtered products:", filtered);
    setFilteredProducts(filtered);
  };

  const handleShowAllClick = () => {
    console.log("Show all clicked");
    setFilteredProducts(products);
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
          <S.Card key={category.id} imageUrl={category.imagemUrl} onClick={() => handleCategoryClick(category.nome)}>
            <S.Overlay>{category.nome}</S.Overlay>
          </S.Card>
        ))}
      </S.CardContainer>
      <ProductList products={filteredProducts} />
    </S.DashboardContainer>
  );
};

export default Dashboard;
