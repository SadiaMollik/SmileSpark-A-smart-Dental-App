require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Admin = require('./models/Admin');
const Dentist = require('./models/Dentist');
const Patient = require('./models/Patient');
const Appointment = require('./models/appointment');
const Contact = require("./models/contact");

const app = express();

app.use(express.json());
app.use(cors());

/* ================= CONNECT MONGODB ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected to SmileSpark"))
  .catch(err => console.log(err));

/* ================= REGISTER ================= */
app.post('/admin/register', async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/dentist/register', async (req, res) => {
  try {
    const dentist = await Dentist.create({
      ...req.body,
      status: "active"
    });
    res.json(dentist);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/patient/register', async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= LOGIN ================= */
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = null;

    if (role === "admin") {
      user = await Admin.findOne({ email, password });
    } else if (role === "dentist") {
      user = await Dentist.findOne({ email, password });
    } else if (role === "patient") {
      user = await Patient.findOne({ email, password });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age || null,
        role: role
      }
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= GET PROFILE ================= */
app.get('/patient/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= ACTIVE DENTISTS ================= */
app.get('/dentist/active', async (req, res) => {
  try {
    const dentists = await Dentist.find({ status: "active" });
    res.json(dentists);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= GET DENTIST ================= */
app.get('/dentist/:id', async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id);
    res.json(dentist);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= BOOK APPOINTMENT ================= */
app.post('/appointment/book', async (req, res) => {
  try {
    const {
      patientId,
      dentistId,
      patientName,
      dentistName,
      date,
      time,
      googleEventId   // 🔥 ADDED (IMPORTANT FOR GOOGLE SYNC)
    } = req.body;

    const appointment = await Appointment.create({
      patientId,
      dentistId,
      patientName,
      dentistName,
      date,
      time,
      status: "confirmed",
      googleEventId: googleEventId || null
    });

    await Dentist.findByIdAndUpdate(dentistId, {
      status: "booked"
    });

    res.json(appointment);

  } catch (err) {
    console.log("BOOK ERROR:", err);
    res.status(500).json(err);
  }
});

/* ================= GET PATIENT APPOINTMENTS ================= */
app.get('/appointment/patient/:id', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.id })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= CANCEL APPOINTMENT ================= */
app.delete('/appointment/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    await Dentist.findByIdAndUpdate(appointment.dentistId, {
      status: "active"
    });

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Appointment cancelled" });

  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= GOOGLE SYNC SUPPORT (NEW OPTIONAL ROUTE) ================= */
app.put("/appointment/google/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { googleEventId: req.body.googleEventId },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= ALL APPOINTMENTS ================= */
app.get("/appointment/all", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name")
      .populate("dentistId", "name");

    res.json(appointments);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= DELETE APPOINTMENT (ADMIN) ================= */
app.delete("/appointment/delete/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= PATIENTS ================= */
app.get("/patients/all", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/patients/block/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient blocked (deleted)" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= DENTISTS ================= */
app.get("/dentists/all", async (req, res) => {
  try {
    const dentists = await Dentist.find();
    res.json(dentists);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/dentists/block/:id", async (req, res) => {
  try {
    await Dentist.findByIdAndDelete(req.params.id);
    res.json({ message: "Dentist blocked (deleted)" });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* ================= CONTACT ================= */
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: "Message saved successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/contact/reply", async (req, res) => {
  try {
    const { email } = req.body;

    await Contact.findOneAndDelete({ email });

    res.json({ message: "Replied and deleted from DB" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE PATIENT ================= */
app.put("/patient/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend is working fine 🚀" });
});


/* ================= SERVER ================= */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});