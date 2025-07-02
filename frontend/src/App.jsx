import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import DoctorList from './pages/DoctorList.jsx';
import BookAppointment from './pages/BookAppointment.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  if (user === null && localStorage.getItem('user')) return null;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          user ? (
            user.role === 'doctor' ? <DoctorDashboard /> : <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/book/:id"
        element={
          user && user.role === 'patient' ? (
            <BookAppointment />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/doctors" element={<DoctorList />} />

      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
