import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';

function DentistViewAppointment() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ================= FETCH ONLY THIS DENTIST APPOINTMENTS =================
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get(`https://smilespark-a-smart-dental-app-backend.onrender.com/appointment/dentist/${user.id || user._id}`)
      .then(res => {
        setAppointments(res.data);
      })
      .catch(err => {
        console.log("FETCH ERROR:", err);
      });
  };

  // ================= CANCEL APPOINTMENT =================
  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    axios.delete(`https://smilespark-a-smart-dental-app-backend.onrender.com/appointment/${id}`)
      .then(() => {
        alert("Appointment cancelled successfully");

        setAppointments(prev => prev.filter(app => app._id !== id));
      })
      .catch(err => {
        console.log("DELETE ERROR:", err.response?.data || err);
        alert("Cancel failed");
      });
  };

  return (
    <div style={{ background: "linear-gradient(to right, #f8fbff, #eef5ff)", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm sticky-top">
        <h3 className="navbar-brand fw-bold text-primary fs-3">SmileSpark 🦷</h3>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4">
          <li>
            <Link to="/dentist-dashboard" className="nav-link fw-semibold fs-5">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/logout" className="nav-link fw-semibold fs-5 btn btn-danger">
              Logout
            </Link>
          </li>

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

      {/* MAIN CONTENT */}
      <div className="container mt-5">

        <h2 className="fw-bold mb-4">My Appointments</h2>

        <div className="row">

          {appointments.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            appointments.map((app) => (
              <div className="col-md-6 mb-3" key={app._id}>
                <div className="card shadow-sm p-3">

                  <h5 className="fw-bold">
                    Patient: {app.patientName}
                  </h5>

                  <h6 className="text-primary">
                    Doctor: Dr. {app.dentistName}
                  </h6>

                  <p>Date: {app.date}</p>
                  <p>Time: {app.time}</p>

                  <p>
                    Status:
                    <span className="ms-2 fw-bold text-success">
                      {app.status}
                    </span>
                  </p>

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

      {/* CONTACT */}
      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default DentistViewAppointment;
