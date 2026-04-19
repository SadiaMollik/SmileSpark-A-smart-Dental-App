
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },

  dentistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dentist",
    required: true
  },

  patientName: {
    type: String,
    required: true
  },

  dentistName: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);