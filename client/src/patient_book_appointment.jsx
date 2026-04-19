import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';

function PatientBookAppointment() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [dentists, setDentists] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState(null);

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH ACTIVE DENTISTS =================
  useEffect(() => {
    axios.get("http://localhost:3001/dentist/active")
      .then(res => setDentists(res.data))
      .catch(err => console.log(err));
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value
    });
  };

  // ================= GOOGLE CALENDAR EVENT =================
  const createGoogleEvent = async (appointment) => {
    try {
      const token = localStorage.getItem("googleToken");

      if (!token) {
        console.log("No Google token found");
        return null;
      }

      // ✅ FIX 1: Add proper duration (30 minutes)
      const startDateTime = new Date(`${appointment.date}T${appointment.time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);

      const event = {
        summary: `Dental Appointment with Dr. ${appointment.dentistName}`,
        description: `Patient: ${appointment.patientName}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: "Asia/Dhaka"
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: "Asia/Dhaka"
        }
      };

      const res = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        event,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      return res.data.id;

    } catch (err) {
      console.log("Google Calendar error:", err.response?.data || err.message);
      return null;
    }
  };

  // ================= BOOK APPOINTMENT =================
  const confirmBooking = async () => {

    if (!appointmentData.date || !appointmentData.time) {
      alert("Please select date and time");
      return;
    }

    // ✅ FIX 2: prevent past date booking
    const selectedDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
    if (selectedDateTime < new Date()) {
      alert("You cannot book past appointments");
      return;
    }

    if (!selectedDentist?._id) {
      alert("Something went wrong. Please try again.");
      return;
    }

    try {
      // 1. Save to MongoDB
      const res = await axios.post("http://localhost:3001/appointment/book", {
        patientId: user.id,
        dentistId: selectedDentist._id,
        patientName: user.name,
        dentistName: selectedDentist.name,
        date: appointmentData.date,
        time: appointmentData.time
      });

      // 2. Google Calendar
      const eventId = await createGoogleEvent({
        patientName: user.name,
        dentistName: selectedDentist.name,
        date: appointmentData.date,
        time: appointmentData.time
      });

      console.log("Google Event ID:", eventId);

      alert(`Appointment booked with Dr. ${selectedDentist.name}`);

      setDentists(prev =>
        prev.filter(d => d._id !== selectedDentist._id)
      );

      setShowModal(false);
      setAppointmentData({ date: "", time: "" });

    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div style={{ background: "linear-gradient(to right, #f8fbff, #eef5ff)", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm sticky-top">
        <h3 className="navbar-brand fw-bold text-primary fs-3">
          SmileSpark 🦷
        </h3>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4">
          <li><Link to="/" className="nav-link fw-semibold fs-5">Home</Link></li>
          <li><Link to="/about" className="nav-link fw-semibold fs-5">About</Link></li>
          <li><Link to="/teethfacts" className="nav-link fw-semibold fs-5">Teeth Facts</Link></li>
          <li><Link to="/logout" className="nav-link fw-semibold fs-5 btn btn-danger">Logout</Link></li>

          <li>
            <button
              className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
              onClick={() => setShowContact(true)}
            >
              Contact Us
            </button>
          </li>
        </ul>
      </nav>

      {/* BODY */}
      <div className="container-fluid mt-4">
        <div className="row g-4">

          {/* SIDEBAR */}
          <div className="col-md-3">
            <div className="bg-light p-4 rounded-4 shadow-sm h-100" style={{ minHeight: "85vh" }}>
              <h5 className="fw-bold mb-4">Dashboard Menu</h5>

              <div className="d-grid gap-3">
                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient-dashboard')}>
                  Dashboard
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_book_appointment')}>
                  Book Appointment
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_view_appointment')}>
                  View Appointments
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_profile')}>
                  My Profile
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/brushtimer')}>
                  Brush Timer
                </button>
              </div>
            </div>
          </div>

          {/* MAIN */}
          <div className="col-md-9">
            <div className="bg-white p-5 rounded-4 shadow-sm">

              <h2 className="fw-bold mb-4">
                Book Appointment with Available Dentists
              </h2>

              <div className="row">
                {dentists.length === 0 ? (
                  <p>No active dentists available</p>
                ) : (
                  dentists.map((dentist) => (
                    <div className="col-md-6 mb-3" key={dentist._id}>
                      <div className="card shadow-sm p-3">

                        <h5 className="fw-bold">Dr. {dentist.name}</h5>
                        <p>Email: {dentist.email}</p>
                        <p>Specialist: {dentist.specialist}</p>

                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setSelectedDentist(dentist);
                            setShowModal(true);
                          }}
                        >
                          Book Appointment
                        </button>

                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}>

          <div className="bg-white p-4 rounded shadow" style={{ width: "350px" }}>

            <h5 className="mb-3">
              Book Dr. {selectedDentist?.name}
            </h5>

            <input
              type="date"
              name="date"
              className="form-control mb-2"
              value={appointmentData.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}   // ✅ FIX 3
            />

            <input
              type="time"
              name="time"
              className="form-control mb-3"
              value={appointmentData.time}
              onChange={handleChange}
            />

            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" onClick={() => setShowModal(false)}>
                Close
              </button>

              <button className="btn btn-success" onClick={confirmBooking}>
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small>© 2026 SmileSpark. All rights reserved.</small>
      </footer>

      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default PatientBookAppointment;