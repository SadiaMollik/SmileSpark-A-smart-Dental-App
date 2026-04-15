import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
        console.log(formData);
        axios.post('https://smilespark-a-smart-dental-app-backend.onrender.com', formData)
        .then(result => console.log(result))
        navigate('/login')
        .catch(error => console.error(error));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-3">
                        <label><strong>Name</strong></label>
                        <input 
                            type="text" 
                            placeholder="Enter Name" 
                            autoComplete="off"
                            name="name" 
                            className="form-control rounded-0"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input 
                            type="email" 
                            placeholder="Enter Email" 
                            autoComplete="off"
                            name="email" 
                            className="form-control rounded-0"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label><strong>Password</strong></label>
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            autoComplete="off"
                            name="password" 
                            className="form-control rounded-0"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label><strong>Role</strong></label>
                        <select 
                            name="role" 
                            className="form-control rounded-0"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="patient">Patient</option>
                            <option value="dentist">Dentist</option>
                        </select>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>

                </form>

                <p className="mt-2">Already have an account?</p>

                <Link 
                    to="/login"
                    className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                >
                    Login
                </Link>

            </div>
        </div>
    );
}

export default Signup;
