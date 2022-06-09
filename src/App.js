import React, { useContext } from 'react';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import AuthContext from './context/auth-context';

import './App.css';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import UsersPage from './pages/UsersPage';
// import NotFound from './components/NotFound';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {!authCtx.isLoggedIn && <LoginPage />}
      {authCtx.isLoggedIn && <UsersPage />}
    </>
    // <Routes>
    //   <Route path='/' element={<Navigate to='login' />} />
    //   <Route path='login' element={<LoginPage />} />
    //   <Route path='users' element={<UsersPage />} />
    //   <Route path='*' element={<NotFound />} />
    // </Routes>
  );
}

export default App;
