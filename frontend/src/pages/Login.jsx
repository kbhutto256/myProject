import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form onSubmit={handleLogin} className='bg-white p-8 shadow rounded w-full max-w-sm'>
        <h2 className='text-2xl mb-4 font-bold'>Login</h2>

        <input
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='w-full p-2 mb-4 border rounded'
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className='w-full p-2 border rounded pr-10'
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-blue-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2'>
          Login
        </button>

        <button
          type='button'
          onClick={() => navigate('/register')}
          className='w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;
