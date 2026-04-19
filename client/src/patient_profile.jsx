import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';
import propic from './profile.jpeg';

function PatientProfile() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FORM STATE =================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",   // ✅ ADDED PASSWORD
    image: ""
  });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    if (!user?.id) return;

    axios.get(`http://localhost:3001/patient/${user.id}`)
      .then(res => {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          age: res.data.age || "",
          password: res.data.password || "", // ⚠️ from backend
          image: res.data.image || ""
        });
      })
      .catch(err => console.log(err));
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= UPDATE PROFILE =================
  const handleUpdate = () => {
    axios.put(`http://localhost:3001/patient/${user.id}`, formData)
      .then(res => {
        alert("Profile updated successfully");

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            name: res.data.name,
            email: res.data.email
          })
        );

        setEditMode(false);
      })
      .catch(err => {
        console.log(err);
        alert("Update failed");
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

      {/* ================= DASHBOARD ================= */}
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

          {/* ================= MAIN PROFILE ================= */}
          <div className="col-md-9">
            <div className="bg-white p-5 rounded-4 shadow-sm">

              <h1 className="fw-bold mb-4">My Profile</h1>

              {/* PROFILE IMAGE */}
              <img
                src={propic}
                alt="profile"
                style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              />

              {/* NAME */}
              <input
                className="form-control mt-3 mb-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
              />

              {/* EMAIL */}
              <input
                className="form-control mb-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
              />

              {/* AGE */}
              <input
                className="form-control mb-2"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!editMode}
              />

              {/* PASSWORD */}
              <input
                className="form-control mb-3"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!editMode}
              />

              {/* BUTTONS */}
              {!editMode ? (
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleUpdate}>
                  Save Changes
                </button>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small>© 2026 SmileSpark. All rights reserved.</small>
      </footer>

      {/* CONTACT MODAL */}
      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default PatientProfile;