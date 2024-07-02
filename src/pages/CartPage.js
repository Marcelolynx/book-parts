import React from 'react';
import Cart from '../components/Cart.js';

const CartPage = ({ cartItems, incrementQuantity, decrementQuantity, removeFromCart }) => {
  return <Cart cartItems={cartItems} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} />;
};

export default CartPage;
