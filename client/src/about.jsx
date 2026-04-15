import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <h3 className="navbar-brand fw-bold">SmileSpark 🦷</h3>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-3">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>

          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          
          <li className="nav-item">
            <button className="btn btn-outline-primary">
              Contact Us
            </button>
            </li>
        </ul>
      </nav>

      {/* About Content */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center fw-bold">About SmileSpark</h2>

        <p className="mt-3 text-center">
          SmileSpark is a modern dental platform designed to connect patients with
          highly qualified dentists. Our system supports three types of users:
          patients, dentists, and administrators.
        </p>

        <p className="text-center">
          Patients can easily book appointments with top-rated dental professionals,
          ensuring quality care and convenience. Dentists can manage their schedules
          and connect with patients efficiently, while administrators oversee the
          entire system.
        </p>

        <p className="text-center">
          In addition, SmileSpark provides useful dental facts and oral health
          education to help users maintain a healthy and confident smile.
        </p>
      </div>
            {/* Footer */}
      <footer className="bg-light text-center p-3">
        © 2026 SmileSpark. All rights reserved.
      </footer>
    </div>
    
  );
}

export default About;