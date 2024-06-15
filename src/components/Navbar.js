import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #6062F6;
  color: white;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.div`
  font-size: 18px;
`;

const LogoutButton = styled.button`
  background-color: #60FF9F;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/cart':
        return 'Carrinho de Compras';
      default:
        if (location.pathname.startsWith('/product/')) {
          return 'Detalhes do Produto';
        }
        return '';
    }
  };

  return (
    <NavbarContainer>
      <NavLinks>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/cart">Carrinho</StyledLink>
      </NavLinks>
      <PageTitle>{getPageTitle()}</PageTitle>
      <LogoutButton onClick={onLogout}>Sair</LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
