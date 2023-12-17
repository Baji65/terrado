
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await dispatch(login({ username, password }));

    if (token) {
      // Navigate to the homepage
      navigate("/task");
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

