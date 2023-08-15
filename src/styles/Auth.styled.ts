import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 300px;
  margin: 50px auto;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const SignForm = styled.form`
  width: 300px;
  margin: auto;
`;

export const InputContainer = styled.div`
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

export const SubmitButton = styled.button`
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

export const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  margin: 4px 0;
`;

export const InfoArea = styled.div`
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
