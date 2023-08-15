import * as S from "../styles/NotFound.styled";

const NotFound = () => {
  return (
    <S.Container>
      <img src={"/images/error.png"} alt="error" width="100px" />
      <S.Message>페이지를 찾을 수 없습니다</S.Message>
      <S.StyledLink to="/todo" replace>
        메인화면으로
      </S.StyledLink>
    </S.Container>
  );
};

export default NotFound;
