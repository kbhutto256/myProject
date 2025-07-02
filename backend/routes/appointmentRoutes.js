const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointmentsByUser,
  deleteAppointment
} = require('../controller/appointmentController');
const Appointment = require('../models/Appointment');

// Get appointments for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId })
      .populate('patient', 'name email');
    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Existing routes
router.post('/', createAppointment);
router.get('/', getAppointmentsByUser);
router.delete('/:id', deleteAppointment);

module.exports = router;
