import React from 'react';
import styled from 'styled-components';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 100px auto; /* Centraliza o card com margem superior e inferior */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
`;

const Button = styled.button`
  width: 100%; /* Faz o botão preencher toda a largura do card */
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

const Cart = ({ cartItems, incrementQuantity, decrementQuantity, removeFromCart, handleCheckout }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + parseFloat(item.valor) * item.quantity, 0).toFixed(2);

  return (
    <CartContainer>
      {cartItems.map((item) => (
        <CartItem key={item.codigo}>
          <div>
            <strong>{item.descricao}</strong>
            <div>Valor: R${parseFloat(item.valor).toFixed(2)}</div>
            <div>Quantidade: {item.quantity}</div>
          </div>
          <div>
            <button onClick={() => incrementQuantity(item.codigo)}>+</button>
            <button onClick={() => decrementQuantity(item.codigo)}>-</button>
            <button onClick={() => removeFromCart(item.codigo)}>Remover</button>
          </div>
        </CartItem>
      ))}
      <CartTotal>
        <div>Total:</div>
        <div>R${totalAmount}</div>
      </CartTotal>
      <Button onClick={handleCheckout}>Fechar Pedido</Button>
    </CartContainer>
  );
};

export default Cart;
