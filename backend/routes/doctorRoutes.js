const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controller/doctorController');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// ✅ Route: Get all doctors
router.get('/', getDoctors);

// ✅ Route: Get doctor by user ID
router.get('/by-user/:userId', async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.params.userId });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Route: Get all appointments for a doctor
router.get('/appointments/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'name email');
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ Moved to the end
