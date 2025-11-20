// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        // Save user info in localStorage to track login
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/search"); // redirect to search page after login
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E0E7FF"
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "15px",
          width: "300px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "0.7rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.7rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "#3B82F6",
            color: "white",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginBottom: "1rem"
          }}
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#3B82F6", fontWeight: "bold" }}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
