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
import BrushTimer from './brushtimer';
import Logout from './logout';
import AdminManageDentists from './admin_manage_dentists';
import AdminManagePatients from './admin_manage_patient';
import AdminViewAppointments from './admin_view_appointments';
import PatientProfile from './patient_profile';
import PatientViewAppointment from './patient_view_appointment';
import PatientBookAppointment from './patient_book_appointment';
import Games from './patient_game';
import DentistViewAppointment from './dentist_view_appointment';
import DentistViewRequest from './dentist_view_request';
import DentistProfile from './dentist_profile';
import AdminBookAppointment from "./admin_book_appointment";
import AdminCheckMsg from './admin_check_msg';
import Weather from './weather';

import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = "309792278374-vgi7nchvbfalunnj6eu10rqt8vasltko.apps.googleusercontent.com";
const API_KEY = "AIzaSyA1w3KmJNdBToGWvlL-IcR9E9lYdLE0bMw";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES,
      });
    }

    gapi.load("client:auth2", start);
  }, []);

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
        <Route path="/brushtimer" element={<BrushTimer />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin_manage_dentists" element={<AdminManageDentists />} />
        <Route path="/admin_manage_patient" element={<AdminManagePatients />} />
        <Route path="/admin_view_appointments" element={<AdminViewAppointments />} />
        <Route path="/patient_profile" element={<PatientProfile />} />
        <Route path="/patient_view_appointment" element={<PatientViewAppointment />} />
        <Route path="/patient_book_appointment" element={<PatientBookAppointment />} />
        <Route path="/patient_game" element={<Games />} />
        <Route path="/dentist_view_appointment" element={<DentistViewAppointment />} />
        <Route path="/dentist_view_request" element={<DentistViewRequest />} />
        <Route path="/dentist_profile" element={<DentistProfile />} />
        <Route path="/admin_book_appointment" element={<AdminBookAppointment />} />
        <Route path="/admin_check_msg" element={<AdminCheckMsg />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
