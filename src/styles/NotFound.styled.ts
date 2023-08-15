import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

export const Message = styled.p`
  color: gray;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  background-color: #36f;
  padding: 8px;
  margin-top: 20px;
  border-radius: 5px;
`;
