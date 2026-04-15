require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// OLD MODEL (keep this)
const SmileSparkModel = require('./models/SmileSpark');

// NEW MODELS
const Admin = require('./models/Admin');
const Dentist = require('./models/Dentist');
const Patient = require('./models/Patient');

const app = express();

app.use(express.json());
app.use(cors());

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected to SmileSpark"))
  .catch(err => console.log(err));

/* ================= OLD GENERAL REGISTER (KEEP) ================= */
app.post('/register', (req, res) => {
  SmileSparkModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

/* ================= ADMIN ================= */
app.post('/admin/register', async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= DENTIST ================= */
app.post('/dentist/register', async (req, res) => {
  try {
    const dentist = await Dentist.create(req.body);
    res.json(dentist);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= PATIENT ================= */
app.post('/patient/register', async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= SERVER ================= */
app.listen(3001, () => {
  console.log("Server running on port 3001");
});