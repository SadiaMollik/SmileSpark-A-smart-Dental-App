import { Link } from 'react-router-dom';

function TeethFacts() {
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                <h3 className="navbar-brand fw-bold">SmileSpark 🦷</h3>

                <ul className="navbar-nav ms-auto d-flex flex-row gap-3">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>

                    <li className="nav-item">
                        <button className="btn btn-outline-primary">
                            Contact Us
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Content */}
            <div className="container mt-5">
                <h1 className="text-center fw-bold">🦷 Teeth Facts & Care</h1>
                <p className="text-center">Learn how to keep your smile healthy and strong for life!</p>



                {/* FUN FACTS */}
                <div className="mt-4">
                    <h3>✨ Fun Facts</h3>
                    <ul>
                        <li>Teeth cannot heal themselves once damaged, unlike bones.</li>
                        <li>Enamel is the hardest substance in the human body—even stronger than bone.</li>
                        <li>Humans have two sets of teeth: baby teeth (20) and adult teeth (32).</li>
                        <li>Teeth start forming before you are even born.</li>
                        <li>People spend around 38 days brushing their teeth over a lifetime.</li>
                        <li>No two people have the same set of teeth—just like fingerprints!</li>
                        <li>Saliva plays an important role in protecting teeth from decay.</li>
                        <li>Tooth decay is one of the most common health issues worldwide.</li>
                        <li>Sharks can grow thousands of teeth in their lifetime, but humans only get two sets!</li>
                        <li>Your mouth contains hundreds of different types of bacteria.</li>
                    </ul>
                </div>

                {/* CAVITIES */}
                <div className="mt-4">
                    <h3>🦠 What are Cavities?</h3>
                    <ul>
                        <li>Cavities are tiny holes in teeth caused by bacteria breaking down sugar.</li>
                        <li>When you eat sugary foods, bacteria produce acid that attacks enamel.</li>
                        <li>Over time, this acid weakens and damages the tooth surface.</li>
                        <li>If untreated, cavities can grow bigger and reach inner layers of the tooth.</li>
                        <li>Cavities can cause pain, sensitivity, and infection.</li>
                        <li>Common signs include toothache, bad breath, and visible holes.</li>
                        <li>Drinking sugary drinks frequently increases the risk.</li>
                        <li>Poor oral hygiene is a major cause of cavities.</li>
                        <li>Regular dental check-ups help detect cavities early.</li>
                        <li>Fluoride helps repair early stages of tooth decay.</li>
                    </ul>
                </div>

                {/* BRUSHING */}
                <div className="mt-4">
                    <h3>🪥 Brushing Tips</h3>
                    <ul>
                        <li>Brush your teeth at least twice a day (morning and before bed).</li>
                        <li>Use fluoride toothpaste to strengthen enamel.</li>
                        <li>Brush for at least 2 minutes each time.</li>
                        <li>Use a soft-bristled toothbrush to avoid damaging gums.</li>
                        <li>Replace your toothbrush every 3–4 months.</li>
                        <li>Hold your brush at a 45-degree angle along the gum line.</li>
                        <li>Don’t forget to brush your tongue.</li>
                        <li>Use gentle circular motions instead of harsh scrubbing.</li>
                        <li>Rinse lightly to keep fluoride effective.</li>
                        <li>Floss daily to clean between teeth.</li>
                        <li>Avoid brushing immediately after acidic foods (wait 30 min).</li>
                        <li>Encourage children to brush properly with supervision.</li>
                    </ul>
                </div>

                {/* HEALTHY FOOD */}
                <div className="mt-4">
                    <h3>🥦 Healthy Food for Teeth</h3>
                    <ul>
                        <li>Milk, cheese, and yogurt are rich in calcium for strong teeth.</li>
                        <li>Leafy greens like spinach and kale help strengthen enamel.</li>
                        <li>Crunchy fruits and vegetables (apples, carrots) help clean teeth naturally.</li>
                        <li>Nuts and seeds provide essential minerals like phosphorus.</li>
                        <li>Drinking water helps wash away food particles and bacteria.</li>
                        <li>Green tea reduces harmful bacteria in the mouth.</li>
                        <li>Eggs provide vitamin D for calcium absorption.</li>
                        <li>Strawberries may help naturally whiten teeth.</li>
                        <li>Avoid sugary snacks, sodas, and sticky candies.</li>
                        <li>Limit acidic foods like citrus and soft drinks.</li>
                        <li>Sugar-free gum increases saliva production.</li>
                        <li>Whole grains support gum health.</li>
                    </ul>
                </div>

            </div>
            {/* Footer */}
            <footer className="bg-light text-center p-3">
                © 2026 SmileSpark. All rights reserved.
            </footer>


        </div>


    );
}

export default TeethFacts;