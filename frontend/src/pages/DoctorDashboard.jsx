import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; // ✅ force full reload
  };

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      if (!user || user.role !== 'doctor') return;

      try {
        setLoading(true);
        setError('');

        const doctorRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/doctors/by-user/${user._id}`
        );

        const doctorId = doctorRes.data?.doctor?._id;
        if (!doctorId) {
          setError('Doctor profile not found');
          return;
        }

        const apptRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/appointments/doctor/${doctorId}`
        );

        setAppointments(apptRes.data.appointments || []);
      } catch (err) {
        console.error('Failed to load doctor appointments:', err);
        setError('Could not load appointments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, []); // ✅ only run once

  // ✅ Redirect if not authorized
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'doctor') return <Navigate to="/dashboard" />;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700">Doctor Dashboard</h2>
          <p className="text-gray-600 mt-1">
            Welcome, <span className="font-medium">{user.name}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments yet.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <p className="text-lg font-semibold text-gray-800">
                Patient: {appt.patient?.name || 'Unknown'}
              </p>
              <p className="text-sm text-gray-600">
                Date: {new Date(appt.dateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Email: {appt.patient?.email || 'N/A'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorDashboard;
