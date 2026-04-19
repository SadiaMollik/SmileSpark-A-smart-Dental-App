import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Contactus from './contactus';

function PatientDashboard() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  // ✅ SAFE parsing (prevents crash if null)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f8fbff, #eef5ff)",
        minHeight: "100vh"
      }}
    >

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

      {/* ================= DASHBOARD LAYOUT ================= */}
      <div className="container-fluid mt-4">

        <div className="row g-4">

          {/* ================= SIDEBAR ================= */}
          <div className="col-md-3">

            <div
              className="bg-light p-4 rounded-4 shadow-sm h-100"
              style={{ minHeight: "85vh" }}
            >

              <h5 className="fw-bold mb-4">Dashboard Menu</h5>


              <div className="d-grid gap-3">

                <button
                  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient-dashboard')}
                >
                 Dashboard
                </button>

                <button
                  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_book_appointment')}
                >
                  Book Appointment
                </button>

                <button
                  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_view_appointment')}
                >
                  View Appointments
                </button>

                <button
                  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_profile')}
                >
                  My Profile
                </button>

                {/* <button
                  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_game')}
                >
                  Games
                </button> */}

                <button
                  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/brushtimer')}
                >
                  Brush Timer
                </button>
{/* 
                <button
  className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
  onClick={() => navigate('/weather')}
>
  Weather
</button> */}

              </div>
            </div>

          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-md-9">

            <div
              className="bg-white p-5 rounded-4 shadow-sm h-100"
              style={{ minHeight: "85vh" }}
            >

              {/* ✅ FIXED: safer name rendering */}
              <h1 className="fw-bold">
                Welcome Back {user?.name ? user.name : "Patient"}!
              </h1>

              <p className="text-muted">
                Manage your appointments and dental care activities from here.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small className="text-muted fs-6">
          © 2026 SmileSpark. All rights reserved.
        </small>
      </footer>

      <Contactus
        show={showContact}
        onClose={() => setShowContact(false)}
      />

    </div>
  );
}

export default PatientDashboard;
