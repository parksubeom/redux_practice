import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/reduxHooks";
import { login, signUp } from "../features/auth/authSlice";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!/^[a-zA-Z0-9]{4,12}$/.test(id)) {
      setError("ID는 4~12자의 영문/숫자여야 합니다.");
      return false;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError("비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      // 로그인 시도지만 무조건 넘어가는걸로
      dispatch(login({ id }));
    } else {
      // 회원가입지만 그냥 로그인 무조건되니까 패스
      dispatch(signUp({ id }));
    }
    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>{isLogin ? "로그인" : "회원가입"}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">
          {isLogin ? "로그인" : "회원가입"}
        </SubmitButton>
        <ToggleButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "계정이 없으신가요? 회원가입"
            : "이미 계정이 있으신가요? 로그인"}
        </ToggleButton>
      </Form>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
`;

const Form = styled.form`
  width: 400px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 1rem;
`;

const ToggleButton = styled.button`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  margin-top: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.9rem;
  text-align: center;
`;
