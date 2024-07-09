import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.js'; 
import Admin from './pages/Admin/Admin.js';
import LoginPage from './pages/Login/LoginPage.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import Home from './pages/Home/Home.js';
import ProductDetail from './pages/Produto/ProdutoDetalhe.js';
import CategoriaFormPage from './pages/Admin/CategoriaFormPage.js';
import CartPage from './pages/CartPage/CartPage.js';

import GlobalStyles from './styles/GlobalStyles.js';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './api/firebase.mjs';

const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
`;

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        console.log("User logged in:", user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          console.log("Fetching user documents: ", userDocRef.path);
          const userDoc = await getDoc(userDocRef);
          if(userDoc.exists()) {
            const userData = { email: user.email, role: userDoc.data().role };
            console.log("User document Data: ", userData);
            setUser(userData)
            setAuthenticated(true);
          } else {
            console.error("Usuário não encontrado!");
            setUser(null);
            setAuthenticated(false);
          }
        } catch (error) {
          console.error("Erro ao acessar documento: ", error);
          setUser(null);
          setAuthenticated(false);
        }
      } else {
        console.log("User logged out");
        setUser(null);
        setAuthenticated(false);
      }
      setLoading(false);
    });
  })

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
    const auth = getAuth();
    auth.signOut().then(() => {
      console.log("User logged out");
      setAuthenticated(false);
      setUser(null);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <GlobalStyles />
      {authenticated && <Navbar onLogout={handleLogout} user={user} />}
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/login" element={!authenticated ? <LoginPage setAuthenticated={setAuthenticated} /> : <Navigate to="/dashboard" />} />
            {authenticated ? (
              <>
                <Route path="/" element={<Home addToCart={addToCart} />} />
                <Route path="/cart" element={<CartPage cartItems={cartItems} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeFromCart={removeFromCart} />} />
                <Route path="/product/:codigo" element={<ProductDetail addToCart={addToCart} />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/cadastrar-categoria" element={<CategoriaFormPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
