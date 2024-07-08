import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #FFFFFF; /* Alterado de #4CAF50 para #FFFFFF */
  color: black; /* Alterado de white para black */
`;


const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const UserContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const UserEmail = styled.div`
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Navbar = ({ onLogout, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User in Navbar: ", user); // Adicionar log
  }, [user]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleAdminClick = () => {
    setDropdownOpen(false);
    navigate('/admin');
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    onLogout();
  };

  return (
    <NavbarContainer>
      <NavLink to="/">Bull Parts</NavLink> 
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/cart">Carrinho</NavLink>
      </NavLinks>
      {user && (
        <UserContainer>
          <UserEmail onClick={handleDropdownToggle}>
            Olá, {user.email}
          </UserEmail>
          <Dropdown show={dropdownOpen}>
            {user.role === 'vendedor' && (
              <DropdownItem onClick={handleAdminClick}>
                Produtos
              </DropdownItem>
            )}
            <DropdownItem onClick={handleLogoutClick}>
              Sair
            </DropdownItem>
          </Dropdown>
        </UserContainer>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
