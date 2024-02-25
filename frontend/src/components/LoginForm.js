import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AppContext } from '../App';
import '../assets/styles/style.css'

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Fields',
        text: 'Please fill in both email and password before sending OTP',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        emailOrUsername: email,
        password,
      });
      setOtpSent(true);
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent',
        text: 'An OTP has been sent to your email',
        confirmButtonColor: '#3085d6',
      });
      localStorage.setItem('password', password);
    } catch (error) {
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'No user found with this email or username',
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'An unexpected error occurred',
          confirmButtonColor: '#d33',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const user = await axios.post('http://127.0.0.1:8000/api/auth/verify-otp-login', {
        email,
        otp,
      });
      console.log(user.data);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have successfully logged in!',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        localStorage.setItem('userName', user.data.username);
        localStorage.setItem('role', user.data.role);
        setIsLoggedIn(true);
        localStorage.setItem('email', user.data.email);
        localStorage.setItem('isLoggedIn', true);
        window.location.href = '/dashboard';
      });
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid OTP',
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'An unexpected error occurred',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  return (
    <div className="login form">
      <header>Login</header>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="button" onClick={handleVerifyOTP} disabled={loading}>
              {loading ? 'Verifying OTP...' : 'Verify OTP & Login'}
            </button>
          </>
        )}
        {!otpSent && (
          <button className="button" onClick={handleSendOTP} disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        )}
      </form>
      <div className="signup">
        <span className="signup">
          Don't have an account?
          <a href="/register">
            <label htmlFor="check">Signup</label>
          </a>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
