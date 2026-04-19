import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Contactus from './contactus';

function Games() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  return (
    <div style={{ background: "linear-gradient(to right, #f8fbff, #eef5ff)", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm sticky-top">
        <h3 className="navbar-brand fw-bold text-primary fs-3">SmileSpark 🦷</h3>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4">
          <li><Link to="/" className="nav-link fw-semibold fs-5">Home</Link></li>
          <li><Link to="/logout" className="nav-link fw-semibold fs-5 btn btn-danger">Logout</Link></li>
          <li>
            <button className="btn btn-outline-primary"
              onClick={() => setShowContact(true)}>
              Contact Us
            </button>
          </li>
        </ul>
      </nav>

      {/* CONTENT */}
      <div className="container mt-5 text-center">
        <h1 className="fw-bold">Fun Games</h1>
        <p className="text-muted">Earn points by playing dental care games.</p>

        <button className="btn btn-success m-3" onClick={() => navigate('/brushtimer')}>
          Brush Timer Game
        </button>
      </div>

      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default Games;