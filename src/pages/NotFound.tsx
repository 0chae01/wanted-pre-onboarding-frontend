import { Link } from "react-router-dom";
import { styled } from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <img src={"/images/error.png"} alt="error" width="100px" />
      <Message>페이지를 찾을 수 없습니다</Message>
      <StyledLink to="/todo" replace>
        메인화면으로
      </StyledLink>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Message = styled.p`
  color: gray;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  background-color: #36f;
  padding: 8px;
  margin-top: 20px;
  border-radius: 5px;
`;
