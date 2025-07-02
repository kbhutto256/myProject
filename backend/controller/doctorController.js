const Doctor = require('../models/Doctor');

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email');
    res.json({ doctors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
