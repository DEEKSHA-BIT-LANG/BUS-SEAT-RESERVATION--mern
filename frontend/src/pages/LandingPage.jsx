// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Redirect to login page first
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #6A11CB, #2575FC)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1 style={{ fontSize: "45px", marginBottom: "10px" }}>
        🚌 Bus Booking System
      </h1>

      <p style={{ fontSize: "20px", opacity: 0.9, marginBottom: "30px" }}>
        Search, explore & book your next journey effortlessly.
      </p>

      <button
        onClick={handleStart}
        style={{
          background: "white",
          color: "#2575FC",
          padding: "12px 25px",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "18px",
          cursor: "pointer",
          border: "none",
          transition: "0.3s"
        }}
      >
        🔍 Start Booking
      </button>
    </div>
  );
}
