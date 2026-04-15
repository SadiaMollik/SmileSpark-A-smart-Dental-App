
import { Link } from 'react-router-dom';

function AdminDashboard() {
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

      {/* DASHBOARD */}
      <div className="container mt-5 text-center">

        <h1 className="fw-bold">Welcome Admin 🧑‍💼</h1>
        <p>Manage the entire SmileSpark system</p>

        <div className="mt-4">

          <button className="btn btn-primary m-2">
            Manage Users
          </button>

          <button className="btn btn-success m-2">
            Manage Dentists
          </button>

          <button className="btn btn-warning m-2">
            Manage Patients
          </button>

          <button className="btn btn-dark m-2">
            View Appointments
          </button>

        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;