const mongoose = require('mongoose');

const DentistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  specialist: {
    type: String,
    required: true
  },

  university: {
    type: String,
    required: true
  },

  passedYear: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["active", "booked"],
    default: "active"
  }

}, { timestamps: true });

module.exports = mongoose.model('Dentist', DentistSchema);
