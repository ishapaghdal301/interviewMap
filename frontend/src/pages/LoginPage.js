import LoginForm from '../components/LoginForm';
import React, { Navigate } from "react-router-dom";

const LoginPage = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  return (
    <div className="container">
      <div className="login-page">
        {isLoggedIn && <Navigate to="/dashboard" />}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
