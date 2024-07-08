import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  background-image: url('/data/img/harley-003.png'); /* caminho para sua imagem de fundo */
  background-size: cover;
  background-position: center;

  &:after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.85;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F8F8F8; /* cor de fundo aplicada */
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
  margin-top: -100px; /* Subir a logo 100px */
`;

const AppName = styled.h1`
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 300px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc; /* Somente borda inferior */
  border-radius: 0; /* Remove borda arredondada */
  background-color: transparent;
  &:focus {
    outline: none;
    border-bottom: 1px solid #000; /* Altera cor da borda ao focar */
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error logging in: ', error);
    }
  };

  return (
    <LoginContainer>
      <ImageContainer />
      <FormContainer>
        <Logo src="/data/img/bull-logo.png" alt="Logo" /> {/* caminho para sua logo */}
        <AppName>Bull Parts</AppName>
        <Form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Login" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button type="submit">LOGIN</Button>
        </Form>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;
