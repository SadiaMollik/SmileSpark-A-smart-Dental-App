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
        navigate("/dentist-dashboard");
      })
      .catch(err => {
        console.error(err);
        alert("Error creating dentist account");
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
        Dentist Registration
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
          <label className="form-label fw-semibold">Specialist</label>
          <input
            type="text"
            name="specialist"
            className="form-control form-control-lg rounded-3"
            placeholder="e.g. Orthodontist, Surgeon"
            value={formData.specialist}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">University Name</label>
          <input
            type="text"
            name="university"
            className="form-control form-control-lg rounded-3"
            value={formData.university}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Passed Year</label>
          <input
            type="year"
            name="passedYear"
            className="form-control form-control-lg rounded-3"
            value={formData.passedYear}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success w-100 py-2 fw-semibold rounded-3 mt-2">
          Create Dentist Account
        </button>

      </form>

    </div>

  </div>

</div>

    </div>
  );
}

export default DentistRegister;
