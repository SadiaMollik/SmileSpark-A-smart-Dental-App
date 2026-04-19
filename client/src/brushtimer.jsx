import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Contactus from "./contactus"; // ✅ FIX 1

function BrushTimer() {
  const navigate = useNavigate();

  const [showContact, setShowContact] = useState(false); // ✅ FIX 2

  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const [points, setPoints] = useState(
    Number(localStorage.getItem("points")) || 0
  );

  const [lastPlayed, setLastPlayed] = useState(
    localStorage.getItem("lastPlayed") || ""
  );

  const today = new Date().toDateString();

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setFinished(true);

      if (lastPlayed !== today) {
        const newPoints = points + 5;
        setPoints(newPoints);
        localStorage.setItem("points", newPoints);
        localStorage.setItem("lastPlayed", today);
        setLastPlayed(today);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (lastPlayed === today) {
      alert("You already completed today's brushing!");
      return;
    }
    setIsRunning(true);
    setFinished(false);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(120);
    setFinished(false);
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
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

      {/* ================= BODY ================= */}
      <div className="container-fluid mt-4">
        <div className="row g-4">

          {/* ================= SIDEBAR ================= */}
          <div className="col-md-3">
            <div className="bg-light p-4 rounded-4 shadow-sm h-100" style={{ minHeight: "85vh" }}>

              <h5 className="fw-bold mb-4">Dashboard Menu</h5>

              <div className="d-grid gap-3">

                <button className="btn bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient-dashboard')}>
                  Dashboard
                </button>

                <button className="btn bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_book_appointment')}>
                  Book Appointment
                </button>

                <button className="btn bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_view_appointment')}>
                  View Appointments
                </button>

                <button className="btn bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_profile')}>
                  My Profile
                </button>

                {/* <button className="btn bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/patient_game')}>
                  Games
                </button> */}

                <button className="btn bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/brushtimer')}>
                  Brush Timer
                </button>

              </div>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-md-9">
            <div className="bg-white p-5 rounded-4 shadow-sm text-center">

              <h2 className="fw-bold mb-2">🪥 Brush Timer</h2>
              <p className="text-muted">Brush your teeth for 2 minutes</p>

              <h1 className="display-3 my-4">{formatTime()}</h1>

              <div>
                <button className="btn btn-success m-2" onClick={startTimer}>
                  Start
                </button>

                <button className="btn btn-warning m-2" onClick={stopTimer}>
                  Stop
                </button>

                <button className="btn btn-danger m-2" onClick={resetTimer}>
                  Reset
                </button>
              </div>

              {finished && (
                <div className="mt-4">
                  <h4>🎉🎉🎉🎉🎉🎉🎉🎉🎉</h4>
                  <p>You earned 5 points</p>
                </div>
              )}

              <div className="mt-4">
                <h5>Total Points: {points}</h5>

                {points >= 100 && (
                  <p className="text-success fw-bold">🏆 Dental Hero Badge</p>
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

      {/* CONTACT MODAL */}
      <Contactus show={showContact} onClose={() => setShowContact(false)} />

    </div>
  );
}

export default BrushTimer;