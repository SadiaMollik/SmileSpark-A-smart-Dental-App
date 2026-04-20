import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.role) {
      alert("All fields are required");
      return;
    }

    axios.post("https://smilespark-a-smart-dental-app-backend.onrender.com/login", formData)
      .then(res => {

        console.log(res.data);

        // ✅ FIX: extract user correctly
        const user = res.data.user;

        if (!user) {
          alert("Login failed");
          return;
        }

        // ✅ store only user
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ redirect using BACKEND role (not formData)
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        }
        else if (user.role === "dentist") {
          navigate("/dentist-dashboard");
        }
        else if (user.role === "patient") {
          navigate("/patient-dashboard");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Invalid email, password or role");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">

      <div className="bg-white p-4 rounded w-25">
        <h2 className="text-center">Login</h2>

        <form onSubmit={handleSubmit}>

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
            <label>Role</label>
            <select
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="patient">Patient</option>
              <option value="dentist">Dentist</option>
            </select>
          </div>

          <button className="btn btn-success w-100">
            Login
          </button>

        </form>

        <p className="mt-3">Don't have an account?</p>

        <Link to="/" className="btn btn-outline-dark w-100">
          Go Back
        </Link>

      </div>
    </div>
  );
}

export default Login;
