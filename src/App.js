import React, { useContext } from 'react';
import AuthContext from './context/auth-context';

import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import NotFound from './components/NotFound';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      {!authCtx.isLoggedIn && (
        <Route path='/' element={<Navigate to='login' />} />
      )}
      {!authCtx.isLoggedIn && <Route path='login' element={<LoginPage />} />}
      <Route
        path='user'
        element={authCtx.isLoggedIn ? <UsersPage /> : <Navigate to='/login' />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
