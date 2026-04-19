
import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("Dhaka");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "8c1cfacb5c79cf31184be82d6fe06038";

  const getWeather = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
      setLoading(false);

    } catch (err) {
      console.log(err);
      alert("Failed to fetch weather");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <div className="card p-4 shadow rounded-4">

        <h2 className="fw-bold mb-3">🌦️ Weather Dashboard</h2>

        <input
          className="form-control mb-3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city (e.g. Dhaka, London)"
        />

        <button className="btn btn-primary mb-3" onClick={getWeather}>
          Get Weather
        </button>

        {loading && <p>Loading...</p>}

        {weather && (
          <div className="mt-3">
            <h4>{weather.name}</h4>
            <p>🌡️ Temp: {weather.main.temp} °C</p>
            <p>🌥️ Condition: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Weather;