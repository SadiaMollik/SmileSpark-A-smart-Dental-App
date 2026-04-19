import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function PatientRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, age } = formData;

    if (!name || !email || !password || !age) {
      alert("All fields are required");
      return;
    }
    axios.post('http://localhost:3001/patient/register', formData)
      .then(res => {
        console.log(res.data);
        alert("Patient account created successfully!");
        navigate("/patient-dashboard"); // ✅ changed
      })
      .catch(err => {
        console.error(err);
        alert("Error creating patient account");
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

  <div className="col-md-7">

    <div className="card shadow-lg border-0 rounded-4 p-4">

      <h2 className="text-center fw-bold text-primary mb-4" style={{ fontSize: "2rem" }}>
        Patient Registration
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="form-control form-control-lg rounded-3"
            value={formData.name}
            onChange={handleChange}
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Age</label>
          <input
            type="number"
            name="age"
            className="form-control form-control-lg rounded-3"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100 py-2 fw-semibold rounded-3 mt-2">
          Create Patient Account
        </button>

      </form>

    </div>

  </div>

</div>

    </div>
  );
}

export default PatientRegister;
