import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Contactus from './contactus';

function DentistDashboard() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  // ✅ SAFE LOCALSTORAGE READ
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ✅ OPTIONAL: PROTECT ROUTE
  useEffect(() => {
    if (!user || !user.name) {
      navigate("/dentist-dashboard");
    }
  }, []);

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

          {/* ✅ FIXED CONTACT BUTTON INSIDE LIST */}
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

      {/* DASHBOARD */}
      <div className="container-fluid mt-4">
        <div className="row g-4">

          {/* SIDEBAR */}
          <div className="col-md-3">
            <div className="bg-light p-4 rounded-4 shadow-sm h-100" style={{ minHeight: "85vh" }}>

              <h5 className="fw-bold mb-4">Dashboard Menu</h5>

              <div className="d-grid gap-3">

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/dentist-dashboard')}>
                  Dashboard
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/dentist_view_request')}>
                  Appointments
                </button>

                {/* <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/dentist_view_appointment')}>
                  View Appointments
                </button> */}

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/dentist_profile')}>
                  My Profile
                </button>

              </div>

            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-md-9">

            <div
              className="bg-white p-5 rounded-4 shadow-sm h-100"
              style={{ minHeight: "85vh" }}
            >

              <h1 className="fw-bold">
                Welcome Dentist {user?.name || ""}
              </h1>

              <p className="text-muted">
                Manage your patients and appointments efficiently.
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

      {/* ================= CONTACT MODAL ================= */}
      <Contactus
        show={showContact}
        onClose={() => setShowContact(false)}
      />

    </div>
  );
}

export default DentistDashboard;
