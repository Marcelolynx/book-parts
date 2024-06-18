import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/Login/LoginPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
`;

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.codigo === product.codigo);
      if (itemIndex > -1) {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const incrementQuantity = (codigo) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.codigo === codigo ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (codigo) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.codigo === codigo ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const removeFromCart = (codigo) => {
    setCartItems((prevItems) => prevItems.filter(item => item.codigo !== codigo));
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      <GlobalStyles />
      {authenticated && <Navbar onLogout={handleLogout} />}
      <AppContainer>
        {authenticated && <Sidebar />}
        <MainContent>
          <Routes>
            <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
            {authenticated ? (
              <>
                <Route path="/" element={<Home addToCart={addToCart} />} />
                <Route path="/cart" element={<CartPage cartItems={cartItems} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} />} />
                <Route path="/product/:codigo" element={<ProductDetail addToCart={addToCart} />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
