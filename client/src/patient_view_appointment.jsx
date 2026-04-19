import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';

function PatientViewAppointment() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH APPOINTMENTS =================
  useEffect(() => {
    if (!user?.id) return;

    axios.get(`http://localhost:3001/appointment/patient/${user.id}`)
      .then(res => {
        setAppointments(res.data);
      })
      .catch(err => console.log(err));
  }, [user?.id]);

  // ================= CANCEL APPOINTMENT =================
  const handleCancel = (appointmentId) => {
    axios.delete(`http://localhost:3001/appointment/${appointmentId}`)
      .then(res => {
        alert("Appointment cancelled successfully");

        setAppointments(prev =>
          prev.filter(app => app._id !== appointmentId)
        );
      })
      .catch(err => {
        console.log(err);
        alert("Cancel failed");
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

      {/* ================= BODY ================= */}
      <div className="container-fluid mt-4">
        <div className="row g-4">

          {/* ================= SIDEBAR ================= */}
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

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-md-9">
            <div className="bg-white p-5 rounded-4 shadow-sm">

              <h2 className="fw-bold mb-4">
                My Appointments
              </h2>

              <div className="row">

                {appointments.length === 0 ? (
                  <p>No appointments found</p>
                ) : (
                  appointments.map((app) => (
                    <div className="col-md-6 mb-3" key={app._id}>
                      <div className="card shadow-sm p-3">

                        {/* ✅ FIXED NAME DISPLAY */}
                        <h5 className="fw-bold">
                          Dr. {app.dentistName}
                        </h5>

                        <p>Date: {app.date}</p>
                        <p>Time: {app.time}</p>

                        <p>
                          Status:
                          <span className="text-success fw-bold ms-2">
                            {app.status}
                          </span>
                        </p>

                        {/* ================= CANCEL BUTTON ================= */}
                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => handleCancel(app._id)}
                        >
                          Cancel Appointment
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

      {/* ================= FOOTER ================= */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small>© 2026 SmileSpark. All rights reserved.</small>
      </footer>

      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default PatientViewAppointment;