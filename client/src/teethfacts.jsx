import { Link } from 'react-router-dom';
import { useState } from 'react';

import projectImage from './project.jpeg';
import cavityImage from './cavety.jpeg';
import brushImage from './brushtee.jpeg';
import foodImage from './food.jpeg';
import Contactus from './contactus';

function TeethFacts() {
     const [showContact, setShowContact] = useState(false);

    return (
        <div
            style={{
                background: "linear-gradient(to right, #f8fbff, #eef5ff)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column"
            }}
        >

            {/* ================= NAVBAR ================= */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 shadow-sm sticky-top">
                <h3 className="navbar-brand fw-bold text-primary fs-3">
                    SmileSpark 🦷
                </h3>

                <ul className="navbar-nav ms-auto d-flex flex-row gap-4">

                    <li><Link to="/" className="nav-link fw-semibold fs-5">Home</Link></li>
                    <li><Link to="/about" className="nav-link fw-semibold fs-5">About</Link></li>
                    <li><Link to="/login" className="nav-link fw-semibold fs-5">Login</Link></li>

                 
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

            {/* ================= CONTENT ================= */}
            <div className="container flex-grow-1 mt-5">

                {/* TITLE */}
                <h1 className="text-center fw-bold mb-2" style={{ fontSize: "3rem" }}>
                    🦷 Teeth Facts & Care
                </h1>

                <p className="text-center text-muted mb-5 fs-5">
                    Learn how to keep your smile healthy and strong for life!
                </p>

                {/* ================= FUN FACTS ================= */}
                <div className="row align-items-center mb-5">

                    <div className="col-md-6">
                        <h3 className="fw-bold mb-3">✨ Fun Facts</h3>
                        <ul className="text-muted fs-5">
                            <li>Teeth cannot heal themselves once damaged.</li>
                            <li>Enamel is the hardest substance in the human body.</li>
                            <li>Humans have 2 sets of teeth in life.</li>
                            <li>Teeth start forming before birth.</li>
                            <li>We spend ~38 days brushing in lifetime.</li>
                        </ul>
                    </div>

                    <div className="col-md-6 text-center">
                        <img
                            src={projectImage}
                            className="img-fluid rounded-4 shadow-lg"
                            style={{ maxHeight: "320px" }}
                        />
                    </div>

                </div>

                {/* ================= CAVITIES ================= */}
                <div className="row align-items-center mb-5">

                    <div className="col-md-6 text-center">
                        <img
                            src={cavityImage}
                            className="img-fluid rounded-4 shadow-lg"
                            style={{ maxHeight: "320px" }}
                        />
                    </div>

                    <div className="col-md-6">
                        <h3 className="fw-bold mb-3">🦠 Cavities</h3>
                        <ul className="text-muted fs-5">
                            <li>Cavities are caused by bacteria and sugar.</li>
                            <li>Acid damages enamel over time.</li>
                            <li>Poor hygiene increases risk.</li>
                            <li>Can cause pain and infection.</li>
                            <li>Fluoride helps prevent decay.</li>
                        </ul>
                    </div>

                </div>

                {/* ================= BRUSHING ================= */}
                <div className="row align-items-center mb-5">

                    <div className="col-md-6">
                        <h3 className="fw-bold mb-3">🪥 Brushing Tips</h3>
                        <ul className="text-muted fs-5">
                            <li>Brush twice daily for 2 minutes.</li>
                            <li>Use fluoride toothpaste.</li>
                            <li>Floss daily.</li>
                            <li>Replace brush every 3 months.</li>
                            <li>Brush tongue too.</li>
                        </ul>
                    </div>

                    <div className="col-md-6 text-center">
                        <img
                            src={brushImage}
                            className="img-fluid rounded-4 shadow-lg"
                            style={{ maxHeight: "320px" }}
                        />
                    </div>

                </div>

                {/* ================= FOOD ================= */}
                <div className="row align-items-center mb-5">

                    <div className="col-md-6 text-center">
                        <img
                            src={foodImage}
                            className="img-fluid rounded-4 shadow-lg"
                            style={{ maxHeight: "320px" }}
                        />
                    </div>

                    <div className="col-md-6">
                        <h3 className="fw-bold mb-3">🥦 Healthy Food</h3>
                        <ul className="text-muted fs-5">
                            <li>Milk, cheese strengthen teeth.</li>
                            <li>Fruits help clean teeth naturally.</li>
                            <li>Water removes bacteria.</li>
                            <li>Green tea reduces germs.</li>
                            <li>Avoid sugary snacks.</li>
                        </ul>
                    </div>

                </div>

            </div>

            {/* ================= FOOTER ================= */}
              {/* FOOTER */}
    <footer className="bg-white text-center p-3 shadow-sm mt-auto">
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

export default TeethFacts;
