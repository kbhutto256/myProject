const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controller/doctorController');
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', getDoctors);

// Get doctor by user ID
router.get('/by-user/:userId', async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.params.userId });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ doctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
