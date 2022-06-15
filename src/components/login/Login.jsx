import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './Login.module.css';

axios.defaults.withCredentials = true;

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    ////////////////////////////////////asdfsadfsfsaffs
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://oakaweapi.herokuapp.com/api/v1/auth/login',
        data: {
          email: enteredEmail,
          password: enteredPassword,
        },
        withCredentials: true,
        crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin': 'https://oakaweapi.herokuapp.com',
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      console.log(response);

      authCtx.login(response.data.user.userId);
      navigate('/user', { replace: true });
    } catch (error) {
      alert(error.message);
    }

    //   fetch('https://oakaweapi.herokuapp.com/api/v1/auth/login', {
    //     // mode: 'no-cors',
    //     method: 'POST',
    //     body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     // credentials: 'include',
    //     credentials: 'same-origin',
    //   })
    //     .then((res) => {
    //       console.log(res.headers.get('set-cookie'));
    //       if (!res.ok) throw new Error('Authentication failed. Try again!!');

    //       return res.json();
    //     })
    //     .then((responseData) => {
    //       authCtx.login(responseData.user.userId);
    //       console.log(responseData);
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
  };

  return (
    <div className={classes.login__page}>
      <h2 className={classes.heading__secondary}>Login</h2>

      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.input__box}>
          <label htmlFor='email' className={classes.form__label}>
            Email
          </label>
          <input
            type='email'
            className={classes.form__input}
            required
            value={enteredEmail}
            onChange={(e) => setEnteredEmail(e.target.value)}
          />
        </div>

        <div className={classes.input__box}>
          <label htmlFor='password' className={classes.form__label}>
            Password
          </label>
          <input
            type='passowrd'
            className={classes.form__input}
            required
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='btn'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
