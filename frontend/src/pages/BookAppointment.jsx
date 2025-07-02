import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const { id } = useParams(); // doctorId
  const [dateTime, setDateTime] = useState('');
  const navigate = useNavigate();

  const handleBook = async () => {
    if (!dateTime) {
      alert('Please select a date and time.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('You must be logged in to book.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/appointments`, {
        doctor: id,
        dateTime,
        patient: user._id,
      });
      alert('Appointment booked successfully!');
      navigate('/');
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded shadow w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>Book an Appointment</h2>
        <input
          type='datetime-local'
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className='w-full p-2 mb-4 border rounded'
        />
        <button
          onClick={handleBook}
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
