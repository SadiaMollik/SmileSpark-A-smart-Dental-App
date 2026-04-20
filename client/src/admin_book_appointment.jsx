
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';

function AdminBookAppointment() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [dentists, setDentists] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState(null);

  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: ""
  });

  // ================= FETCH DENTISTS =================
  useEffect(() => {
    axios.get("https://smilespark-a-smart-dental-app-backend.onrender.com/dentist/active")
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

  // ================= BOOK APPOINTMENT =================
  const confirmBooking = () => {

    if (!appointmentData.date || !appointmentData.time) {
      alert("Please select date and time");
      return;
    }

    if (!selectedDentist?._id) {
      alert("Something went wrong");
      return;
    }

    axios.post("https://smilespark-a-smart-dental-app-backend.onrender.com/appointment/book", {
      patientId: user.id, // admin is booking on behalf
      dentistId: selectedDentist._id,
      patientName: "Booked by Admin",
      dentistName: selectedDentist.name,
      date: appointmentData.date,
      time: appointmentData.time
    })
    .then(res => {
      alert(`Appointment booked with Dr. ${selectedDentist.name}`);

      setShowModal(false);
      setAppointmentData({ date: "", time: "" });
    })
    .catch(err => {
      console.log("ERROR:", err.response?.data || err);
      alert("Booking failed");
    });
  };

  return (
    <div style={{ background: "linear-gradient(to right, #f8fbff, #eef5ff)", minHeight: "100vh" }}>

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm sticky-top">
        <h3 className="navbar-brand fw-bold text-primary fs-3">
          SmileSpark 🦷
        </h3>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4">
          <li><Link to="/" className="nav-link fw-semibold fs-5">Home</Link></li>
          <li><Link to="/about" className="nav-link fw-semibold fs-5">About</Link></li>
          <li><Link to="/teethfacts" className="nav-link fw-semibold fs-5">Teeth Facts</Link></li>
          <li><Link to="/logout" className="nav-link fw-semibold fs-5 btn btn-danger">Logout</Link></li>

          {/* <li>
            <button
              className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
              onClick={() => setShowContact(true)}
            >
              Contact Us
            </button>
          </li> */}
        </ul>
      </nav>

      {/* ================= DASHBOARD ================= */}
      <div className="container-fluid mt-4">
        <div className="row g-4">

          {/* ================= SIDEBAR ================= */}
          <div className="col-md-3">
            <div className="bg-light p-4 rounded-4 shadow-sm h-100" style={{ minHeight: "85vh" }}>

              <h5 className="fw-bold mb-4">Dashboard Menu</h5>

              <div className="d-grid gap-3">

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin-dashboard')}>
                  Dashboard
                </button>


                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_manage_dentists')}>
                  Manage Dentists
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_manage_patient')}>
                  Manage Patients
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_book_appointment')}>
                  Book Appointment
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_view_appointments')}>
                  View Appointments
                </button>

                <button
                  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_check_msg')}
                >
                  Check Messages
                </button>

              </div>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-md-9">
            <div className="bg-white p-5 rounded-4 shadow-sm">

              <h2 className="fw-bold mb-4">Book Appointment (Admin Panel)</h2>

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

      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}
        >
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
              min={new Date().toISOString().split("T")[0]}
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

      {/* ================= FOOTER ================= */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small className="text-muted fs-6">
          © 2026 SmileSpark. All rights reserved.
        </small>
      </footer>

      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default AdminBookAppointment;
