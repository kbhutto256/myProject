const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, default: 'General' }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
