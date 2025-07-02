const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const { doctor, patient, dateTime } = req.body;
    const newAppt = await Appointment.create({ doctor, patient, dateTime });
    res.status(201).json({ appointment: newAppt });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { patientId } = req.query;
    if (!patientId) return res.status(400).json({ error: 'Missing patientId' });

    const appointments = await Appointment.find({ patient: patientId })
      .populate({
        path: 'doctor',
        populate: { path: 'user' }
      });

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};
