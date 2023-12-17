// Header.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import TaskForm from './TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleShowTaskForm = () => {
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  useEffect(() => {
    if (token && isAuthenticated) {
      navigate('/task');
    }
  }, [token, isAuthenticated, navigate]);

  return (
    <div className="container-fluid bg-light p-3">
      <div className="d-flex justify-content-between">
        {isAuthenticated ? (
          <>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
            <button className="btn btn-primary" onClick={handleShowTaskForm}>
              Add Task
            </button>
            {showTaskForm && <TaskForm onClose={handleCloseTaskForm} />}
          </>
        ) : (
          <>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              Login
            </button>
            {location.pathname === '/login' && (
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Register
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

