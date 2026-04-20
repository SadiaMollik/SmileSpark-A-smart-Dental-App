import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';

function AdminManageDentists() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [dentists, setDentists] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ================= FETCH DENTISTS =================
  useEffect(() => {
    fetchDentists();
  }, []);

  const fetchDentists = () => {
    axios.get("https://smilespark-a-smart-dental-app-backend.onrender.com/dentists/all")
      .then(res => {
        setDentists(res.data);
      })
      .catch(err => {
        console.log("FETCH ERROR:", err);
      });
  };

  // ================= BLOCK DENTIST =================
  const handleBlock = (id) => {
    if (!window.confirm("Are you sure you want to block this dentist?")) return;

    axios.delete(`https://smilespark-a-smart-dental-app-backend.onrender.com/dentist/block/${id}`)
      .then(() => {
        alert("Dentist blocked successfully");

        // remove from UI
        setDentists(prev => prev.filter(d => d._id !== id));
      })
      .catch(err => {
        console.log("BLOCK ERROR:", err.response?.data || err);
        alert("Failed to block dentist");
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

              <h2 className="fw-bold mb-4">Manage Dentists</h2>

              <div className="row">

                {dentists.length === 0 ? (
                  <p>No dentists found</p>
                ) : (
                  dentists.map((dentist) => (
                    <div className="col-md-6 mb-3" key={dentist._id}>
                      <div className="card shadow-sm p-3">

                        <h5 className="fw-bold">
                          Dr. {dentist.name}
                        </h5>

                        <p>Email: {dentist.email}</p>
                        <p>Specialist: {dentist.specialist}</p>

                        <button
                          className="btn btn-danger mt-2"
                          onClick={() => handleBlock(dentist._id)}
                        >
                          Block Dentist
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

export default AdminManageDentists;
