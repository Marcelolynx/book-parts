import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../api/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #4a90e2;
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
  background-color: #90ee90;
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
  border-bottom: 1px solid #000;
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

const LoginPage = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const usersRef = collection(db, 'motoBook-data', 'users');
      const q = query(usersRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setAuthenticated(true);
        navigate('/');
      } else {
        setError('No such user exists');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <LoginContainer>
      <LeftSection>
        <h1>Eleven</h1>
        <p>Clinic Care</p>
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
            <div style={{ position: 'relative', width: '100%' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={toggleShowPassword}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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
