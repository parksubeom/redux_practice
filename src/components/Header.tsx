import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Modern Blog</Logo>
        <Menu>
          {isAuthenticated ? (
            <>
              <UserInfo>{currentUser?.id}님</UserInfo>
              <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
            </>
          ) : (
            <AuthButton onClick={() => navigate('/login')}>로그인 / 회원가입</AuthButton>
          )}
        </Menu>
      </NavContainer>
    </Nav>
  );
};

export default Header;

const Nav = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.span`
  font-weight: 500;
`;

const AuthButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0b5ed7;
  }
`;