import { Link } from 'react-router-dom';
import { useState } from 'react';
import Contactus from './contactus';

import projectImage from './about.jpeg';
import iiiiImage from './iiii.jpeg';

function About() {

  const [showContact, setShowContact] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f8fbff, #eef5ff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm sticky-top">
        <h3 className="navbar-brand fw-bold text-primary fs-3">
          SmileSpark 🦷
        </h3>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4">

          <li><Link to="/" className="nav-link fw-semibold fs-5">Home</Link></li>
          <li><Link to="/about" className="nav-link fw-semibold fs-5">About</Link></li>
          <li><Link to="/teethfacts" className="nav-link fw-semibold fs-5">Teeth Facts</Link></li>
          <li><Link to="/login" className="nav-link fw-semibold fs-5">Login</Link></li>
          

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

      {/* CONTENT */}
      <div className="container flex-grow-1 mt-5">

        {/* TITLE */}
        <h2 className="text-center fw-bold mb-5" style={{ fontSize: "2.8rem" }}>
          About <span className="text-primary">SmileSpark</span>
        </h2>

        {/* SECTION 1 */}
        <div className="row align-items-center mb-5">

          <div className="col-md-6 text-center">
            <img
              src={projectImage}
              alt="Dental Care"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "350px" }}
            />
          </div>

          <div className="col-md-6">
            <p className="fs-5 text-muted">
              SmileSpark is a modern dental platform designed to connect patients with
              highly qualified dentists. Our system supports three types of users:
              patients, dentists, and administrators.
            </p>
          </div>

        </div>

        {/* SECTION 2 */}
        <div className="row align-items-center mb-5">

          <div className="col-md-6 order-md-2 text-center">
            <img
              src={iiiiImage}
              alt="Smile Dental"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: "350px" }}
            />
          </div>

          <div className="col-md-6 order-md-1">
            <p className="fs-5 text-muted">
              Patients can easily book appointments with top-rated dental professionals,
              ensuring quality care and convenience. Dentists manage schedules efficiently,
              while admins maintain system control.
            </p>
          </div>

        </div>

        {/* FINAL TEXT */}
        <div className="text-center mt-4">
          <p className="fs-5 text-muted">
            SmileSpark also provides dental education, oral care tips, and awareness tools
            to help users maintain a healthy and confident smile 😁
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small className="text-muted fs-6">
          © 2026 SmileSpark. All rights reserved.
        </small>
      </footer>

      {/* CONTACT MODAL */}
      <Contactus
        show={showContact}
        onClose={() => setShowContact(false)}
      />

    </div>
  );
}

export default About;
