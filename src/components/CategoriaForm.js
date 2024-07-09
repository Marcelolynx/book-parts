import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../api/firebase.mjs';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #333;
  }
`;

const CategoriaForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [imagem, setImagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imagem) {
      alert('Por favor, selecione uma imagem para a categoria.');
      return;
    }

    try {
      const storageRef = ref(storage, `categorias/${imagem.name}`);
      await uploadBytes(storageRef, imagem);
      const imageUrl = await getDownloadURL(storageRef);

      const categoriesRef = collection(db, 'categorias');
      await addDoc(categoriesRef, { nome: categoryName, imagemUrl: imageUrl });
      setCategoryName('');
      setImagem(null);
      alert('Categoria adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar categoria: ', error);
      alert('Erro ao adicionar categoria.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <Label>Nome da Categoria:</Label>
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
      </InputContainer>
      <InputContainer>
        <Label>Imagem da Categoria:</Label>
        <Input
          type="file"
          onChange={(e) => setImagem(e.target.files[0])}
          required
        />
      </InputContainer>
      <Button type="submit">Adicionar Categoria</Button>
    </FormContainer>
  );
};

export default CategoriaForm;
  