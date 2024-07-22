import React from 'react';
import Cart from '../../components/Cart.js';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/firebase.mjs';

const CartPage = ({ cartItems, incrementQuantity, decrementQuantity, removeFromCart }) => {
  const handleCheckout = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const phoneNumber = userData.phone;
        const message = `Pedido de ${user.email}:\n\n` +
          cartItems.map(item => `Produto: ${item.descricao}\nQuantidade: ${item.quantity}\nValor: R$${item.valor}\n`).join('\n') +
          `\nTotal: R$${cartItems.reduce((acc, item) => acc + parseFloat(item.valor) * item.quantity, 0).toFixed(2)}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
      } else {
        alert('Não foi possível encontrar os dados do usuário.');
      }
    } else {
      alert('Usuário não autenticado.');
    }
  };

  return <Cart cartItems={cartItems} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} handleCheckout={handleCheckout} />;
};

export default CartPage;
