import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';
import rain_teeth from './rain_teeth.jpeg';
import sun_teeth from './sun_teeth.jpeg';
import cold_teeth from './cold_teeth.jpeg';

function PatientDashboard() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  // WEATHER STATES
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "8c1cfacb5c79cf31184be82d6fe06038";

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // ================= FETCH WEATHER BY LOCATION =================
  const getWeatherByLocation = async (lat, lon) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ================= FIXED LOCATION DETECTION =================
  useEffect(() => {
    const fallback = () => getWeatherByLocation(23.8103, 90.4125);

    if (!navigator.geolocation) {
      fallback();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        if (typeof lat === "number" && typeof lon === "number") {
          getWeatherByLocation(lat, lon);
        } else {
          fallback();
        }
      },
      () => fallback(),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  }, []);

  // ================= WEATHER IMAGE LOGIC =================
  const getWeatherImage = () => {
    if (!weather) return null;

    const main = weather.weather[0].main.toLowerCase();

    if (main.includes("rain")) return rain_teeth;
    if (main.includes("cloud")) return cold_teeth;
    if (weather.main.temp < 20) return cold_teeth;

    return sun_teeth;
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #f8fbff, #eef5ff)",
      minHeight: "100vh"
    }}>

      {/* NAVBAR (UNCHANGED) */}
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

      {/* DASHBOARD */}
      <div className="container-fluid mt-4">
        <div className="row g-4">

          {/* SIDEBAR (UNCHANGED) */}
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

          {/* ================= MAIN CONTENT (UNCHANGED UI) ================= */}
          <div className="col-md-9">
            <div className="bg-white p-4 rounded-4 shadow-sm h-100">

              <div className="text-center mb-4">
                <h1 className="fw-bold">
                  Welcome Back {user?.name ? user.name : "Patient"}!
                </h1>

                <p className="text-muted">
                  Manage your appointments and dental care activities from here.
                </p>

                <div className="d-inline-block mt-3 px-4 py-2 bg-light rounded-pill shadow-sm">
                  🦷 <b>Smile Tip:</b> Brush twice daily & visit dentist regularly
                </div>
              </div>

              <div className="row g-4 align-items-stretch">

                <div className="col-md-6">
                  <div className="p-4 rounded-4 shadow-sm bg-light text-center h-100">

                    <h4 className="fw-bold mb-3">🌤 Today's Weather</h4>

                    {loading && <p>Detecting your location...</p>}

                    {weather && !loading && (
                      <>
                        <h5>{weather.name}</h5>
                        <p className="mb-1">🌡 {weather.main.temp}°C</p>
                        <p className="mb-1">☁ {weather.weather[0].description}</p>
                        <p className="mb-0">💧 {weather.main.humidity}% humidity</p>
                      </>
                    )}

                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 rounded-4 shadow-sm bg-light text-center h-100 d-flex align-items-center justify-content-center">

                    {weather && !loading && (
                      <img
                        src={getWeatherImage()}
                        alt="weather"
                        style={{
                          width: "250px",
                          height: "250px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                        }}
                      />
                    )}

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small>© 2026 SmileSpark. All rights reserved.</small>
      </footer>

      <Contactus show={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}

export default PatientDashboard;
