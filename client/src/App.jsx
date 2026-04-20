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
