import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorList from './DoctorList';

const Dashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      fetchAppointments(storedUser._id);
    }
  }, []);

  const fetchAppointments = async (userId) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/appointments?patientId=${userId}`);
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-3xl font-bold text-indigo-700'>Welcome, {user.name}</h2>
        <button
          onClick={handleLogout}
          className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded'
        >
          Logout
        </button>
      </div>

      <p className='mb-6 text-gray-600'>Role: {user.role}</p>

      {/* Available Doctors - now scrollable and fixed height */}
      <div className='mb-10'>
        <h3 className='text-2xl font-semibold mb-4'>Available Doctors</h3>
        <div className='max-h-[400px] overflow-y-auto pr-2'>
          <DoctorList />
        </div>
      </div>

      {/* My Appointments */}
      <div>
        <h3 className='text-2xl font-semibold mb-4'>My Appointments</h3>
        {appointments.length === 0 ? (
          <p className='text-gray-500'>No appointments yet.</p>
        ) : (
          <ul className='space-y-4'>
            {appointments.map((appt) => (
              <li key={appt._id} className='bg-white p-4 rounded shadow'>
                <p>
                  <span className='font-medium'>Doctor:</span>{' '}
                  {appt.doctor?.user?.name || 'Unknown'}
                </p>
                <p>
                  <span className='font-medium'>Specialization:</span>{' '}
                  {appt.doctor?.specialization || 'N/A'}
                </p>
                <p>
                  <span className='font-medium'>Date:</span>{' '}
                  {new Date(appt.dateTime).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
