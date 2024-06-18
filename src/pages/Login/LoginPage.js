import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../api/firebase';  // Caminho atualizado
import { collection, getDocs, query, where, doc } from 'firebase/firestore';
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  LoginContainer,
  LeftSection,
  RightSection,
  LoginForm,
  Input,
  Button,
  ErrorMessage,
  ForgotPassword
} from './styles';

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

      console.log('User authenticated:', user);
      console.log('User email:', user.email); // Log do email do usuário

      // Fetch user role from Firestore
      const docRef = doc(db, 'MotoBook-data', 'users');
      const usersRef = collection(docRef, 'users'); // Acessando a subcoleção 'users' dentro de 'MotoBook-data/users'
      const q = query(usersRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      console.log('Query snapshot:', querySnapshot);
      console.log('Query snapshot size:', querySnapshot.size);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log('Document data:', doc.data());
        });

        const userData = querySnapshot.docs[0].data();
        console.log('User data from Firestore:', userData);
        setAuthenticated(true);
        navigate('/');
      } else {
        setError('No such user exists');
      }
    } catch (error) {
      setError('Invalid username or password');
      console.error('Error during login:', error);
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
