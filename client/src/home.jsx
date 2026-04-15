import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import projectImage from './project.jpeg';

function Home() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.role) {
      alert("Please select a role");
      return;
    }

    // Close modal first (nice UX)
    setShowModal(false);

    if (formData.role === 'admin') {
      navigate('/admin-register');
    }

    if (formData.role === 'dentist') {
      navigate('/dentist-register'); // future page
    }

    if (formData.role === 'patient') {
      navigate('/patient-register'); // future page
    }
  };

  return (
    <div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <h3 className="navbar-brand fw-bold">SmileSpark 🦷</h3>

        <ul className="navbar-nav ms-auto d-flex flex-row align-items-center gap-3">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>

          <li>
            <button className="btn btn-outline-primary">
              Contact Us
            </button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="container text-center mt-5">

        <h1 className="fw-bold">Welcome to SmileSpark 🦷</h1>
        <p>Your trusted dental care companion</p>

        <div className="mt-3">

          <Link to="/teethfacts" className="btn btn-info m-2">
            Teeth Facts
          </Link>

          <button
            className="btn btn-success m-2"
            onClick={() => setShowModal(true)}
          >
            Get Started
          </button>

        </div>

        <img
          src={projectImage}
          alt="SmileSpark Dental"
          className="img-fluid rounded shadow mb-4"
          style={{ maxHeight: "350px", objectFit: "cover" }}
        />
      </div>

      {/* FOOTER */}
      <footer className="bg-light text-center p-3 mt-5">
        © 2026 SmileSpark. All rights reserved.
      </footer>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-4 text-center">

              <h4 className="mb-3">You are --</h4>

              {/* ROLE DROPDOWN */}
              <div className="mb-3 text-start">
                <label><strong>Role</strong></label>

                <select
                  name="role"
                  className="form-control rounded-0"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="patient">Patient</option>
                  <option value="dentist">Dentist</option>
                </select>
              </div>

              {/* SUBMIT */}
              <button className="btn btn-success" onClick={handleSubmit}>
                ➡️
              </button>

              {/* LOGIN */}
              <p className="mt-4">Already have an account?</p>
              <Link to="/login" className="btn btn-outline-dark">
                ➡️ Login
              </Link>

              {/* CLOSE */}
              <button
                className="btn btn-danger mt-3"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;