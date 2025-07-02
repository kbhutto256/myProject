const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

const {
  createAppointment,
  getAppointmentsByUser,
  deleteAppointment
} = require('../controller/appointmentController');

// ✅ Get appointments for a specific doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'name email');
    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor appointments' });
  }
});

// ✅ Create a new appointment
router.post('/', createAppointment);

// ✅ Get appointments for a specific patient (via query param: ?patientId=...)
router.get('/', getAppointmentsByUser);

// ✅ Delete appointment
router.delete('/:id', deleteAppointment);

module.exports = router;
