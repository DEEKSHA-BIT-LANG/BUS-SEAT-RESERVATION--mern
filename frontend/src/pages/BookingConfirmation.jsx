import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  const location = useLocation();
  const { busId, seats, totalPrice, pricePerSeat } =
    location.state || { seats: [], totalPrice: 0, pricePerSeat: 0 };

  const handleGooglePay = () => {
    setShowQR(true);

    setTimeout(() => {
      navigate("/payment-success", {
        state: { busId, seats, totalPrice, pricePerSeat },
      });
    }, 10000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2.5rem",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          width: "420px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 1rem",
            borderRadius: "50%",
            backgroundColor: "#10B981",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2.5rem",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ✓
        </div>

        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#111827" }}>
          Booking Confirmed!
        </h2>

        <p><strong>Bus ID:</strong> {busId}</p>
        <p>Seats: <strong>{seats.join(", ")}</strong></p>
        <p>Price Per Seat: <strong>₹{pricePerSeat}</strong></p>

        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.3rem",
            fontWeight: "bold",
            color: "#10B981",
          }}
        >
          Total: ₹{totalPrice}
        </p>

        {/* Pay Button */}
        <button
          onClick={handleGooglePay}
          style={{
            marginTop: "1.5rem",
            padding: "0.7rem 2rem",
            backgroundColor: "#000",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "1.1rem",
          }}
        >
          Pay with Google Pay
        </button>

        {/* Home Button */}
        <Link to="/" style={{ display: "block", marginTop: "1.2rem" }}>
          <button
            style={{
              padding: "0.7rem 2rem",
              backgroundColor: "#3B82F6",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Home
          </button>
        </Link>

        {/* QR Code Popup */}
        {showQR && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f3f4f6",
              borderRadius: "10px",
            }}
          >
            <h3>Scan to Pay</h3>

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupiid@oksbi&am=${totalPrice}`}
              alt="Google Pay QR"
              style={{ width: "200px", marginTop: "10px" }}
            />

            <p style={{ marginTop: "10px", fontWeight: "600" }}>
              Redirecting in 10 seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
