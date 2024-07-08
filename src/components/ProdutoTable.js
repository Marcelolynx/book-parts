import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../api/firebase.mjs';
import styled from 'styled-components';

const TableContainer = styled.div`
  padding: 0 10%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
`;

const Thead = styled.thead`
  background-color: #f2f2f2;
`;

const Th = styled.th`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
`;

const Img = styled.img`
  width: 50px;
  height: auto;
  border-radius: 4px;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.delete ? '#f44336' : '#4CAF50'};
  color: white;
`;

const ProductTable = ({ products, onEdit, fetchProducts }) => {

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'produtos', id));
      fetchProducts(); // Atualizar a tabela de produtos
      alert('Produto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir produto: ', error);
      alert('Erro ao excluir produto.');
    }
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Imagem</Th>
            <Th>Código</Th>
            <Th>Descrição</Th>
            <Th>Valor</Th>
            <Th>Categoria</Th>
            <Th>Marca</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <tbody>
          {products.map(product => (
            <Tr key={product.id}>
              <Td>
                <Img src={product.imagens && product.imagens[0] ? product.imagens[0] : 'default-image.jpg'} alt={product.descricao} />
              </Td>
              <Td>{product.codigo}</Td>
              <Td>{product.descricao}</Td>
              <Td>{product.valor}</Td>
              <Td>{product.categoriaId}</Td>
              <Td>{product.marca}</Td>
              <Td>
                <Button onClick={() => onEdit(product)}>Editar</Button>
                <Button delete onClick={() => handleDelete(product.id)}>Excluir</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
