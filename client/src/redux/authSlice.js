import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: '',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = '';
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/login', userData);
   
    const token = response.data.token;
    dispatch(loginSuccess(token));
    return token;

  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    await axios.post('http://localhost:5000/register', userData);
    // Optionally, you can automatically login the user after registration
    // dispatch(login(userData));
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

export default authSlice.reducer;
