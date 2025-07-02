const mongoose = require('mongoose');
const AppointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateTime: Date
});
module.exports = mongoose.model('Appointment', AppointmentSchema);