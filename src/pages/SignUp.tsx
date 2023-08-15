import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../apis/auth";
import * as S from "../styles/Auth.styled";

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
      const result = await signUp(email, password);
      if (result.status === 201) {
        alert(result.message);
        navigate("/signin");
      }
      if (result.status === 400) {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <S.Container>
      <S.Title>회원가입</S.Title>
      <S.SignForm onSubmit={handleSubmit}>
        <S.InputContainer>
          <label>이메일</label>
          <input
            type="email"
            data-testid="email-input"
            onChange={handleEmailInput}
            value={email}
            placeholder="이메일을 입력해주세요."
          />
          {!isEmailValid && (
            <S.ErrorMessage>'@'를 포함한 이메일을 입력해주세요.</S.ErrorMessage>
          )}
        </S.InputContainer>
        <S.InputContainer>
          <label>비밀번호</label>
          <input
            type="password"
            data-testid="password-input"
            onChange={handlePasswordInput}
            value={password}
            placeholder="비밀번호를 입력해주세요."
          />
          {!isPasswordValid && (
            <S.ErrorMessage>8자 이상의 비밀번호를 입력해주세요.</S.ErrorMessage>
          )}
        </S.InputContainer>
        <S.SubmitButton
          data-testid="signup-button"
          type="submit"
          disabled={!checkEveryInput()}
        >
          가입하기
        </S.SubmitButton>
      </S.SignForm>
      <S.InfoArea>
        <p>이미 가입하셨나요?</p>
        <Link to="/signin">로그인</Link>
      </S.InfoArea>
    </S.Container>
  );
};

export default SignUp;
