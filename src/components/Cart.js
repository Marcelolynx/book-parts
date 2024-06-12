import React from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

const CartContainer = styled.div`
  padding: 16px;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartTitle = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
`;

const ItemTitle = styled.p`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #666;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin: 0 8px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #c9302c;
  }
`;

const TotalContainer = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #ddd;
  text-align: right;
`;

const TotalText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Cart = ({ cartItems, incrementQuantity, decrementQuantity, removeFromCart }) => {
  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.valor.replace(',', '.')) * item.quantity, 0);

  return (
    <CartContainer>
      <CartTitle>Carrinho de Compras</CartTitle>
      {cartItems.map(item => (
        <CartItem key={item.codigo}>
          <ItemDetails>
            <ItemTitle>{item.descricao}</ItemTitle>
            <ItemPrice>Preço: R${item.valor}</ItemPrice>
            <ItemPrice>Quantidade: {item.quantity}</ItemPrice>
          </ItemDetails>
          <QuantityControls>
            <Button onClick={() => decrementQuantity(item.codigo)} disabled={item.quantity <= 1}>-</Button>
            <span>{item.quantity}</span>
            <Button onClick={() => incrementQuantity(item.codigo)}>+</Button>
          </QuantityControls>
          <div>
            <ItemPrice>Total: R${(parseFloat(item.valor.replace(',', '.')) * item.quantity).toFixed(2)}</ItemPrice>
          </div>
          <RemoveButton onClick={() => removeFromCart(item.codigo)}>
            <FaTrash />
          </RemoveButton>
        </CartItem>
      ))}
      <TotalContainer>
        <TotalText>Valor Total: R${totalAmount.toFixed(2)}</TotalText>
      </TotalContainer>
    </CartContainer>
  );
};

export default Cart;
