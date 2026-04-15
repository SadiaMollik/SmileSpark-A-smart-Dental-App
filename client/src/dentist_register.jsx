import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function DentistRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialist: "",
    university: "",
    passedYear: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, specialist, university, passedYear } = formData;

    if (!name || !email || !password || !specialist || !university || !passedYear) {
      alert("All fields are required");
      return;
    }

    // 🔥 CONNECT TO BACKEND
    axios.post('https://smilespark-a-smart-dental-app-backend.onrender.com/dentist/register', formData)
      .then(res => {
        console.log(res.data);
        alert("Dentist account created successfully!");
        navigate("/login");
      })
      .catch(err => {
        console.error(err);
        alert("Error creating dentist account");
      });
  };

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <h3 className="navbar-brand fw-bold">SmileSpark 🦷</h3>

        <ul className="navbar-nav ms-auto d-flex flex-row align-items-center gap-3">

          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>

          <li className="nav-item">
            <Link to="/teethfacts" className="nav-link">Teeth Facts</Link>
          </li>

          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>

        </ul>
      </nav>

      {/* FORM */}
      <div className="container mt-5">

        <h2 className="text-center fw-bold">Dentist Registration</h2>

        <form onSubmit={handleSubmit} className="mt-4">

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Specialist</label>
            <input
              type="text"
              name="specialist"
              className="form-control"
              placeholder="e.g. Orthodontist, Surgeon"
              value={formData.specialist}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>University Name</label>
            <input
              type="text"
              name="university"
              className="form-control"
              value={formData.university}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Passed Year</label>
            <input
              type="number"
              name="passedYear"
              className="form-control"
              value={formData.passedYear}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success w-100">
            Create Dentist Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default DentistRegister;
