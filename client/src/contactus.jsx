import { useState } from "react";
import axios from "axios";

function ContactModal({ show, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3001/contact",
        formData
      );

      alert(res.data.message || "Message sent successfully!");

      // reset form
      setFormData({ name: "", email: "", message: "" });

      onClose();

    } catch (err) {
      console.log(err);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>

        <h4 className="text-center mb-3">📩 Contact Us</h4>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* MESSAGE */}
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
            />
          </div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-between">

            <button
              type="button"
              className="btn btn-danger"
              onClick={onClose}
            >
              Close
            </button>

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ContactModal;