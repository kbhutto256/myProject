const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  // Add more fields if needed
});

module.exports = mongoose.model('Doctor', doctorSchema);
