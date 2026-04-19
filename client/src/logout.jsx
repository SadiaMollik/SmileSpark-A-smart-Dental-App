
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 CLEAR USER DATA (important)
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    // Optional: clear brush timer data if needed
    // localStorage.removeItem("points");
    // localStorage.removeItem("lastPlayed");

    // 🔄 REDIRECT TO HOME
    navigate("/");
  }, [navigate]);

  return (
    <div className="text-center mt-5">
      <h3>Logging out...</h3>
    </div>
  );
}

export default Logout;