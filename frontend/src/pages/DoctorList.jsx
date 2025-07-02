import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`);
      console.log("Doctor API response:", res.data);
      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctors();
}, []);


  if (loading) {
    return <p className="p-6 text-gray-600 text-center">Loading doctors...</p>;
  }

  return (
    <div className='p-6 min-h-screen bg-gray-50'>
      <h2 className='text-3xl font-bold mb-6 text-center text-indigo-700'>Available Doctors</h2>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {doctors.length === 0 ? (
          <p className='text-gray-500 text-center col-span-full'>No doctors found.</p>
        ) : (
          doctors.map((doc) => (
            <div key={doc._id} className='bg-white p-4 rounded-xl shadow hover:shadow-lg transition'>
              <p className='text-xl font-semibold text-gray-800'>{doc?.user?.name || 'Unknown Doctor'}</p>
              <p className='text-sm text-gray-500 mb-2'>{doc.specialization}</p>
              <Link
                to={`/book/${doc._id}`}
                className='inline-block mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm font-medium'
              >
                Book Appointment
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;
