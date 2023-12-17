import React from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from './components/RegisterForm';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Taskpage from "./components/Taskpage";
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<RegisterForm />} />
          <Route path="/task" element={<Taskpage />} />

        </Routes>
       
      </Router>
    </Provider>
  );
};

export default App;
