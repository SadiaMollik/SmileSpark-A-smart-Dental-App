
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Contactus from './contactus';

function DentistViewAppointment() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  return (
    <div style={{ background: "linear-gradient(to right, #f8fbff, #eef5ff)", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm sticky-top">
        <h3 className="navbar-brand fw-bold text-primary fs-3">SmileSpark 🦷</h3>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4">
          <li><Link to="/dentist-dashboard" className="nav-link fw-semibold fs-5">Dashboard</Link></li>
          <li><Link to="/logout" className="nav-link fw-semibold fs-5 btn btn-danger">Logout</Link></li>

          <li>
            <button className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
              onClick={() => setShowContact(true)}>
              Contact Us
            </button>
          </li>
        </ul>
      </nav>

      {/* CONTENT */}
      <div className="container mt-5">
        <h2 className="fw-bold">My Appointments</h2>

        <div className="bg-white p-4 rounded-4 shadow-sm mt-4">
          <p className="text-muted">No appointments loaded yet (connect API here).</p>
        </div>
      </div>

      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default DentistViewAppointment;