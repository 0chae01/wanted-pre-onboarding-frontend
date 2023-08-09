import { Link, NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const user = localStorage.getItem("token");

  return (
    <Container>
      <Logo to="/todo">TODO</Logo>
      <Menu>
        {user ? (
          <LogoutButton onClick={logout}>로그아웃</LogoutButton>
        ) : (
          <>
            <NavLink
              to={"/signup"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              회원가입
            </NavLink>
            <NavLink
              to={"/signin"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              로그인
            </NavLink>
          </>
        )}
      </Menu>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #e1e2e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: #36f;
  font-size: 30px;
  font-weight: 800;
  text-decoration: none;
  box-sizing: border-box;
  margin: 0;
`;

const Menu = styled.div`
  a {
    padding: 10px;
    text-decoration: none;
    color: gray;
    font-size: 18px;
    font-weight: 600;
  }
  a.active {
    color: #36f;
  }
`;

const LogoutButton = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: gray;
  padding: 10px;
  cursor: pointer;
`;
