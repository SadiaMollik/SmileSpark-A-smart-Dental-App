import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './home';
import TeethFacts from './teethfacts';
import About from './about';
import DentistRegister from './dentist_register';
import AdminRegister from './admin_register';
import PatientRegister from './patient_register';
import PatientDashboard from './patient_dashboard';
import DentistDashboard from './dentist_dashboard';
import AdminDashboard from './admin_dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/teethfacts" element={<TeethFacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/dentist-register" element={<DentistRegister />} />
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/dentist-dashboard" element={<DentistDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;