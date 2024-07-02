import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../api/firebase.mjs';

const CategoriaSearch = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categorias');
        const snapshot = await getDocs(categoriesRef);
        const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched categorias:', categoriesList); // Adicione este log para depuração
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categorias:', error); // Adicione este log para depuração
      }
    };

    fetchCategories();
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Buscar por Categoria</h3>
      <select onChange={(e) => onCategorySelect(e.target.value)} style={{ padding: '10px', fontSize: '16px' }}>
        <option value="">Todas</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.nome}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoriaSearch;
