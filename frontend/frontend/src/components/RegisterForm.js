import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/styles/style.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password1: '',
    password2: '',
    phoneNumber: '',
    role: '',
    otp: '',
  });
  const [error, setError] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async () => {
    if (!formData.email || !formData.username || !formData.password1 || !formData.password2 || !formData.phoneNumber || !formData.role) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Fields',
        text: 'Please fill in all fields before sending OTP',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (formData.password1 !== formData.password2) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords Mismatch',
        text: 'Passwords do not match',
        confirmButtonColor: '#d33',
      });
      return;
    }

    if (formData.password1.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password should be at least 6 characters long',
        confirmButtonColor: '#d33',
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
      });
      setShowOTPField(true);
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent',
        text: 'An OTP has been sent to your email',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      if (error.response?.data?.msg) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response.data.msg,
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An unexpected error occurred',
          confirmButtonColor: '#d33',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/verify-otp-register', {
        email: formData.email,
        otp: formData.otp,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password1: formData.password1,
        password2: formData.password2,
      });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        window.location.href = '/login';
      });
    } catch (error) {
      if (error.response?.data) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.response.data.error,
          confirmButtonColor: '#d33',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An unexpected error occurred',
          confirmButtonColor: '#d33',
        });
      }
    }
  };

  return (
    <div className="register form">
      <header>Signup</header>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Role</option>
          {formData.username && (
            <>
              <option value="interviewer">Interviewer</option>
              <option value="interviewee">Interviewee</option>
            </>
          )}
        </select>
        {showOTPField && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
            />
          </>
        )}
        <div className="button-container">
          <button className="button" onClick={handleSendOTP} disabled={loading}>
            {loading ? 'Sending OTP...' : showOTPField ? 'Resend OTP' : 'Send OTP'}
          </button>
        </div>
        {showOTPField && (
          <div className="button-container">
            <input type="button" className="button small-button" value="Register" onClick={handleRegister} />
          </div>
        )}
      </form>
      <div className="signup">
        <span className="signup">
          Already have an account?{' '}
          <a href="/login">
            Signin
          </a>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
