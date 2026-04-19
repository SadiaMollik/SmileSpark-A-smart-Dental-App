import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import projectImage from './smile.jpeg';
import Contactus from './contactus';

function Home() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ role: "" });
  const [showContact, setShowContact] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    setShowModal(false);

    if (formData.role === 'admin') navigate('/admin-register');
    if (formData.role === 'dentist') navigate('/dentist-register');
    if (formData.role === 'patient') navigate('/patient-register');
  };

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

  <ul className="navbar-nav ms-auto d-flex flex-row align-items-center gap-4">

    <li><Link to="/" className="nav-link fw-semibold fs-5">Home</Link></li>
    <li><Link to="/about" className="nav-link fw-semibold fs-5">About</Link></li>
    <li><Link to="/login" className="nav-link fw-semibold fs-5">Login</Link></li>

    <li>
      <button
        className="btn btn-outline-primary px-4 py-2 rounded-pill fw-semibold"
        onClick={() => setShowContact(true)}
      >
        Contact Us
      </button>
    </li>

  </ul>
</nav>

{/* HERO - FULL HEIGHT (UPGRADED) */}
<div
  className="container flex-grow-1 d-flex align-items-center"
  style={{ minHeight: "100vh", paddingTop: "40px", paddingBottom: "40px" }}
>

  <div className="row align-items-center w-100">

    {/* LEFT TEXT */}
    <div className="col-md-6 text-md-start text-center">

      <h1
        className="fw-bold mb-4"
        style={{ fontSize: "3.6rem", lineHeight: "1.15" }}
      >
        Your Smile, <span className="text-primary">Our Priority</span> 🦷
      </h1>

      <p
        className="text-muted mb-4"
        style={{ fontSize: "1.5rem", lineHeight: "1.6" }}
      >
        SmileSpark connects patients and dentists in one smart platform
        for better dental care and awareness.
      </p>

      <div className="mt-4">

        <Link
          to="/teethfacts"
          className="btn btn-info px-5 py-3 me-3 rounded-pill fw-semibold"
          style={{ fontSize: "1.1rem" }}
        >
          Teeth Facts
        </Link>

        <button
          className="btn btn-success px-5 py-3 rounded-pill fw-semibold"
          style={{ fontSize: "1.1rem" }}
          onClick={() => setShowModal(true)}
        >
          Get Started →
        </button>

      </div>

    </div>

    {/* RIGHT IMAGE */}
    <div className="col-md-6 text-center mt-5 mt-md-0">

      <img
        src={projectImage}
        alt="SmileSpark Dental"
        className="img-fluid rounded-4 shadow-lg"
        style={{
          maxHeight: "420px",
          width: "80%",
          objectFit: "cover"
        }}
      />

    </div>

  </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white text-center p-3 shadow-sm">
        <small className="text-muted fs-6">
          © 2026 SmileSpark. All rights reserved.
        </small>
      </footer>

      {/* ROLE MODAL */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center rounded-4 shadow">

              <h4 className="mb-3 fw-bold fs-3">Select Your Role</h4>

              <div className="mb-3 text-start">
                <label className="fw-semibold fs-5">Role</label>

                <select
                  name="role"
                  className="form-control mt-2 rounded-3 fs-5"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="patient">Patient</option>
                  <option value="dentist">Dentist</option>
                </select>
              </div>

              <button
                className="btn btn-success w-100 rounded-pill mt-2 fs-5"
                onClick={handleSubmit}
              >
                Continue →
              </button>

              <p className="mt-4 text-muted fs-5">Already have an account?</p>

              <Link to="/login" className="btn btn-outline-dark w-100 rounded-pill fs-5">
                Login →
              </Link>

              <button
                className="btn btn-danger mt-3 rounded-pill"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      <Contactus
        show={showContact}
        onClose={() => setShowContact(false)}
      />

    </div>
  );
}

export default Home;
