import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Brand = styled(Link)`
  font-size: 1.5em;
  font-weight: bold;
  color: #000;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 20px;
  color: #000;
  text-decoration: none;
  font-size: 1em;

  &:hover {
    text-decoration: underline;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  color: #000;
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;

  ${UserMenu}:hover & {
    display: block;
  }
`;

const DropdownItem = styled(Link)`
  padding: 10px 20px;
  text-decoration: none;
  color: #000;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <NavbarContainer>
      <Brand to="/Dashboard">Bull Parts</Brand>
      <NavLinks>
        <NavLink to="/Dashboard">Home</NavLink>
        <NavLink to="/cart">Carrinho</NavLink>
        {user && (
          <UserMenu>
            <UserButton>{`Olá, ${user.email}`}</UserButton>
            <DropdownMenu>
              {user.role === 'vendedor' && (
                <>
                  <DropdownItem to="/admin">Produtos</DropdownItem>
                  <DropdownItem to="/admin/cadastrar-categoria">Categorias</DropdownItem>
                </>
              )}
              <DropdownItem as="button" onClick={handleLogout}>Sair</DropdownItem>
            </DropdownMenu>
          </UserMenu>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
