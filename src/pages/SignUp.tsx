import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../constants/path";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setIsEmailValid(emailValue.length === 0 || emailValue.includes("@"));
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setIsPasswordValid(passwordValue.length === 0 || passwordValue.length >= 8);
    setPassword(e.target.value);
  };

  const checkEveryInput = () => {
    return !!email && !!password && isEmailValid && isPasswordValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status === 400) {
        const data = await response.json();
        alert(data.message);
      }
      if (response.status === 201) {
        alert(`회원가입이 완료되었습니다. 로그인 해주세요.`);
        navigate("/signin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <SignUpForm onSubmit={handleSubmit}>
        <InputContainer>
          <label>이메일</label>
          <input
            type="email"
            data-testid="email-input"
            onChange={handleEmailInput}
            value={email}
            placeholder="이메일을 입력해주세요."
          />
          {!isEmailValid && (
            <ErrorMessage>'@'를 포함한 이메일을 입력해주세요.</ErrorMessage>
          )}
        </InputContainer>
        <InputContainer>
          <label>비밀번호</label>
          <input
            type="password"
            data-testid="password-input"
            onChange={handlePasswordInput}
            value={password}
            placeholder="비밀번호를 입력해주세요."
          />
          {!isPasswordValid && (
            <ErrorMessage>8자 이상의 비밀번호를 입력해주세요.</ErrorMessage>
          )}
        </InputContainer>
        <SubmitButton
          data-testid="signup-button"
          type="submit"
          disabled={!checkEveryInput()}
        >
          가입하기
        </SubmitButton>
      </SignUpForm>
      <SignInButtonArea>
        <p>이미 가입하셨나요?</p>
        <Link to="/signin">로그인</Link>
      </SignInButtonArea>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  margin: 50px auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const SignUpForm = styled.form`
  width: 300px;
  margin: auto;
`;

const InputContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;

  label {
    font-size: 16px;
    color: #888888;
    font-weight: 600;
    text-align: start;
    width: 80px;
  }
  input {
    font-size: 16px;
    box-sizing: border-box;
    height: 48px;
    padding: 0 10px;
    margin-top: 4px;
    border: 1px solid #e1e2e3;
    border-radius: 5px;

    &:focus {
      border-color: #36f;
    }
  }
`;

const SubmitButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin: 10px 0;

  color: #ffffff;
  background-color: #36f;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      background-color: #f2f4f7;
      cursor: default;
      color: #ccc;
    `}
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  margin: 4px 0;
`;

const SignInButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  a {
    color: #36f;
  }
  p {
    color: gray;
  }
`;
