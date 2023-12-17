
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, password }));
    setUsername('');
    setPassword('');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="uname" className="form-label"><b>Username:</b></label>
          <input
            type="email"
            className="form-control"
            id="uname"
            placeholder="Enter Email"
            name="uname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="psw" className="form-label"><b>Password:</b></label>
          <input
            type="password"
            className="form-control"
            id="psw"
            placeholder="Enter Password"
            name="psw"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
