<<<<<<< HEAD
import LoginForm from '../components/LoginForm';
import React, { Navigate } from "react-router-dom";

const LoginPage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  return (
    <div className="container">
      <div className="login-page">
        {isLoggedIn && <Navigate to="/dashboard" />}
=======
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="container">
      <div className="login-page">
>>>>>>> 3931d003c314baf125cad6dd2865607019dfa429
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
