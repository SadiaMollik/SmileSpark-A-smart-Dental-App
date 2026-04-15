
import { Link } from 'react-router-dom';

function PatientDashboard() {
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
        <h1 className="fw-bold">Welcome Patient 🧑‍🦷</h1>
        <p>Your dental care journey starts here!</p>

        <div className="mt-4">
          <button className="btn btn-primary m-2">
            Book Appointment
          </button>

          <button className="btn btn-outline-secondary m-2">
            View Appointments
          </button>
        </div>
      </div>

    </div>
  );
}

export default PatientDashboard;