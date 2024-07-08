import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../api/firebase.mjs';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  grid-column: span 1;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  @media (min-width: 768px) {
    grid-column: span 2;
  }
`;

const ProductForm = ({ currentProduct, setCurrentProduct, fetchProducts }) => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    codigo: '',
    codigo_oem: '',
    descricao: '',
    valor: '',
    sku: '',
    categoriaId: '',
    tag: '',
    marca: '',
    aplicacoes: '',
    imagens: [],
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesRef = collection(db, 'categorias');
      const snapshot = await getDocs(categoriesRef);
      const categoriesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setProductData(currentProduct);
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = productData.imagens[0];
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const product = { ...productData, imagens: [imageUrl] };

      if (currentProduct) {
        const productRef = doc(db, 'produtos', currentProduct.id);
        await updateDoc(productRef, product);
        alert('Produto atualizado com sucesso!');
      } else {
        const productsRef = collection(db, 'produtos');
        await addDoc(productsRef, product);
        alert('Produto adicionado com sucesso!');
      }

      setProductData({
        codigo: '',
        codigo_oem: '',
        descricao: '',
        valor: '',
        sku: '',
        categoriaId: '',
        tag: '',
        marca: '',
        aplicacoes: '',
        imagens: [],
      });
      setImage(null);
      setCurrentProduct(null);
      fetchProducts();  // Atualizar a tabela de produtos
    } catch (error) {
      console.error('Erro ao adicionar/atualizar produto: ', error);
      alert('Erro ao adicionar/atualizar produto.');
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label>
          Código:
          <Input type="text" name="codigo" value={productData.codigo} onChange={handleChange} required />
        </Label>
        <Label>
          Código OEM:
          <Input type="text" name="codigo_oem" value={productData.codigo_oem} onChange={handleChange} />
        </Label>
        <Label>
          Descrição:
          <Input type="text" name="descricao" value={productData.descricao} onChange={handleChange} required />
        </Label>
        <Label>
          Valor:
          <Input type="text" name="valor" value={productData.valor} onChange={handleChange} required />
        </Label>
        <Label>
          SKU:
          <Input type="text" name="sku" value={productData.sku} onChange={handleChange} />
        </Label>
        <Label>
          Categoria:
          <Select name="categoriaId" value={productData.categoriaId} onChange={handleChange} required>
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.nome}</option>
            ))}
          </Select>
        </Label>
        <Label>
          Tag:
          <Input type="text" name="tag" value={productData.tag} onChange={handleChange} />
        </Label>
        <Label>
          Marca:
          <Input type="text" name="marca" value={productData.marca} onChange={handleChange} />
        </Label>
        <Label>
          Aplicações:
          <Input type="text" name="aplicacoes" value={productData.aplicacoes} onChange={handleChange} />
        </Label>
        <Label>
          Imagem:
          <Input type="file" onChange={handleImageChange} />
        </Label>
        <Button type="submit">{currentProduct ? 'Atualizar Produto' : 'Adicionar Produto'}</Button>
      </Form>
    </FormContainer>
  );
};

export default ProductForm;
