import React, { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '../../context/auth-context';
import axios from 'axios';
import { cookies } from '../../API/cookie';

import classes from './Users.module.css';

const Users = () => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [user, setUser] = useState({});

  const oldPassword = useRef();
  const newPassword = useRef();

  const { userId, logout } = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://oakaweapi.herokuapp.com/api/v1/users/user`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // if (response.statusText !== 'OK') throw new Error("Can't fetch the user");
  };

  useEffect(() => {
    fetchUser();
    // axios
    //   .get('https://oakaweapi.herokuapp.com/api/v1/users/user')
    //   .then((response) => {
    //     const user = response.data;

    //     console.log(user);
    //   });

    // fetch('https://oakaweapi.herokuapp.com/api/v1/users/user')
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     const user = responseData.users.filter((user) => user._id === userId);
    //     setUser(...user);
    //   });
  }, []);

  const changePasswordHandler = async () => {
    try {
      // const response = await fetch(
      //   'https://oakaweapi.herokuapp.com/api/v1/users/updateUserPassword',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       oldPassword: oldPassword.current.value,
      //       newPassword: newPassword.current.value,
      //     }),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );

      const response = await axios.post(
        'https://oakaweapi.herokuapp.com/api/v1/users/updateUserPassword',
        {
          oldPassword: oldPassword.current.value,
          newPassword: newPassword.current.value,
        }
      );

      if (response.statusText !== 'OK') throw new Error('wrong password');

      console.log(response.data.msg);
      setOpenChangePassword((prevState) => !prevState);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <button className={`btn ${classes.logout__btn}`} onClick={logout}>
        Logout
      </button>
      ;
      <div className={classes.users}>
        <div className={classes.user}>
          <p className={classes.text}>
            Name
            <span>:</span>
            <span>{user?.name}</span>
          </p>
          <p className={classes.text}>
            Email
            <span className={classes.email}>:</span>
            <span>{user?.email}</span>
          </p>
          <p className={classes.text}>
            Role
            <span className={classes.role}>:</span>
            <span>{user?.role}</span>
          </p>
          {openChangePassword && (
            <div className={classes.change__password}>
              <input
                type='password'
                className={classes.input}
                required
                placeholder='Old password'
                ref={oldPassword}
              />
              <input
                type='password'
                className={classes.input}
                required
                placeholder='New password'
                ref={newPassword}
              />
            </div>
          )}

          <button
            type='button'
            className={`btn ${classes.password__btn}`}
            onClick={changePasswordHandler}
          >
            {openChangePassword ? 'Confirm' : 'Change Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
