import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useAppSelector } from './hooks/reduxHooks';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';

import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <MainContainer>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const MainContainer = styled.main`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export default App;