import React, { useState } from 'react';

const AuthContext = React.createContext({
  userId: '',
  isLoggedIn: false,
  login: (id) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(null);

  // const userIsLoggedIn = !!userId;
  const userIsLoggedIn = !!userId;

  const loginHandler = (id) => {
    setUserId(id);
  };

  const logoutHandler = () => {
    setUserId(null);
  };

  const contextValue = {
    userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
