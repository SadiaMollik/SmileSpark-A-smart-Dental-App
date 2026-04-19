import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    // CONNECT TO BACKEND
    axios.post( "http://localhost:3001/admin/register", formData )
      .then(res => {
        console.log(res.data);
        alert("Admin account created successfully!");
        navigate("/admin-dashboard");
      })
      .catch(err => {
        console.error(err);
        alert("Error creating admin account");
      });
  };

  return (
    <div>

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


   {/* FORM */}
<div className="container mt-5 d-flex justify-content-center">

  <div
    className="p-4 shadow-lg rounded-4 bg-white"
    style={{ maxWidth: "500px", width: "100%" }}
  >

    <h2 className="text-center fw-bold mb-4" style={{ fontSize: "2rem" }}>
      Admin Registration
    </h2>

    <form onSubmit={handleSubmit} className="mt-3">

      <div className="mb-3">
        <label className="form-label fw-semibold">Name</label>
        <input
          type="text"
          name="name"
          className="form-control form-control-lg rounded-3"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Email</label>
        <input
          type="email"
          name="email"
          className="form-control form-control-lg rounded-3"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Password</label>
        <input
          type="password"
          name="password"
          className="form-control form-control-lg rounded-3"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
        />
      </div>

      <button
        className="btn btn-primary w-100 py-2 fw-semibold rounded-pill mt-3"
        style={{ fontSize: "1.1rem" }}
      >
        Create Account
      </button>

    </form>

  </div>

</div>

    </div>
  );
}

export default AdminRegister;
