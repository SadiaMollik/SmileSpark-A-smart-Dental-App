import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Contactus from './contactus';

function AdminCheckMsg() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [messages, setMessages] = useState([]);

  // ✅ Reply states
  const [replyBox, setReplyBox] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [replyText, setReplyText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= FETCH CONTACT MESSAGES =================
  useEffect(() => {
    axios.get("https://smilespark-a-smart-dental-app-backend.onrender.com/contact")
      .then(res => setMessages(res.data))
      .catch(err => console.log("FETCH ERROR:", err));
  }, []);

  // ================= DELETE MESSAGE =================
  const handleDelete = (id) => {
    axios.delete(`https://smilespark-a-smart-dental-app-backend.onrender.com/contact/${id}`)
      .then(() => {
        setMessages(prev => prev.filter(msg => msg._id !== id));
        alert("Message deleted");
      })
      .catch(err => {
        console.log(err);
        alert("Delete failed");
      });
  };

  // ================= OPEN REPLY BOX =================
  const openReply = (email) => {
    setSelectedEmail(email);
    setReplyText("");
    setReplyBox(true);
  };

  // ================= SEND REPLY =================
  const sendReply = () => {
    if (!replyText) {
      alert("Reply cannot be empty");
      return;
    }

axios.post("https://smilespark-a-smart-dental-app-backend.onrender.com/contact/reply", {
  email: selectedEmail,
  message: replyText
})
.then(() => {
  alert("Reply sent successfully");

  // remove from UI immediately
  setMessages(prev =>
    prev.filter(msg => msg.email !== selectedEmail)
  );

  setReplyBox(false);
  setReplyText("");
  setSelectedEmail("");
})
    .catch(err => {
      console.log(err);
      alert("Reply failed");
    });
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

          {/* <li>
            <button
              className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
              onClick={() => setShowContact(true)}
            >
              Contact Us
            </button>
          </li> */}
        </ul>
      </nav>

      {/* ================= DASHBOARD ================= */}
      <div className="container-fluid mt-4">
        <div className="row g-4">

          {/* ================= SIDEBAR ================= */}
          <div className="col-md-3">
            <div className="bg-light p-4 rounded-4 shadow-sm h-100" style={{ minHeight: "85vh" }}>

              <h5 className="fw-bold mb-4">Dashboard Menu</h5>

              <div className="d-grid gap-3">
                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin-dashboard')}>
                  Dashboard
                </button>


                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_manage_dentists')}>
                  Manage Dentists
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_manage_patient')}>
                  Manage Patients
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_book_appointment')}>
                  Book Appointment
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_view_appointments')}>
                  View Appointments
                </button>

                <button className="btn w-100 bg-white text-primary fw-semibold shadow-sm"
                  onClick={() => navigate('/admin_check_msg')}>
                  Check Messages
                </button>

              </div>
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="col-md-9">

            <div className="bg-white p-5 rounded-4 shadow-sm h-100" style={{ minHeight: "85vh" }}>

              <h2 className="fw-bold mb-4">📩 Contact Messages</h2>

              <div className="row">

                {messages.length === 0 ? (
                  <p className="text-muted">No messages found</p>
                ) : (
                  messages.map((msg) => (
                    <div className="col-md-6 mb-3" key={msg._id}>
                      <div className="card shadow-sm p-3">

                        <h5 className="fw-bold">{msg.name}</h5>
                        <p>Email: {msg.email}</p>
                        <p>Message: {msg.message}</p>

                        <div className="d-flex justify-content-between mt-3">

                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(msg._id)}
                          >
                            Cancel
                          </button>

                          <button
                            className="btn btn-primary"
                            onClick={() => openReply(msg.email)}
                          >
                            Reply
                          </button>

                        </div>

                      </div>
                    </div>
                  ))
                )}

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ================= REPLY MODAL ================= */}
      {replyBox && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>

            <h5 className="mb-3">Reply to: {selectedEmail}</h5>

            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="d-flex justify-content-between">

              <button
                className="btn btn-danger"
                onClick={() => setReplyBox(false)}
              >
                Close
              </button>

              <button
                className="btn btn-success"
                onClick={sendReply}
              >
                Send
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="bg-white text-center p-3 shadow-sm mt-4">
        <small className="text-muted fs-6">
          © 2026 SmileSpark. All rights reserved.
        </small>
      </footer>

      {/* ================= CONTACT MODAL ================= */}
      <Contactus
        show={showContact}
        onClose={() => setShowContact(false)}
      />

    </div>
  );
}

export default AdminCheckMsg;
