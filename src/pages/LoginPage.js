import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 2;
  background-color: #6062F6; /* Background color to match the image */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 48px;
  font-weight: bold;
  flex-direction: column;
  text-align: center;

  h1 {
    font-size: 3em;
    margin: 0;
  }

  p {
    font-size: 1.5em;
    margin: 0;
  }
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #60FF9F; /* Light green background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid #000;
  background: transparent;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #333;
  }

  svg {
    margin-left: 8px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  font-size: 0.9em;
  color: #000;
  text-decoration: none;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const mockUser = {
  username: 'test',
  password: 'admin@@',
};

const LoginPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === mockUser.username && password === mockUser.password) {
      setAuthenticated(true);
      navigate('/');
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <LoginContainer>
      <LeftSection>
        <h1>BOOK</h1>
        <p>PARTS</p>
      </LeftSection>
      <RightSection>
        <LoginForm>
          <h2>login</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ForgotPassword href="#">esqueci a senha</ForgotPassword>
            <Button type="submit">
              ENTRAR <FaArrowRight />
            </Button>
          </form>
        </LoginForm>
      </RightSection>
    </LoginContainer>
  );
};

export default LoginPage;
