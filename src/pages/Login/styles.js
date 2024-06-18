import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const LeftSection = styled.div`
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

export const RightSection = styled.div`
  flex: 1;
  background-color: #90ee90;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginForm = styled.div`
  width: 300px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
`;

export const Button = styled.button`
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

export const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

export const ForgotPassword = styled.a`
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
