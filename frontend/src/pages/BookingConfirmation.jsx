import { useLocation, Link } from "react-router-dom";

export default function BookingConfirmation() {
  const location = useLocation();
  // Receive totalPrice and pricePerSeat from SeatSelection
  const { busId, seats, totalPrice, pricePerSeat } = location.state || { seats: [], totalPrice: 0, pricePerSeat: 0 };

  const handlePayment = () => {
    alert("Payment integration coming soon! (Razorpay/Stripe)");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
      padding: "2rem"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2.5rem",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        width: "420px",
        textAlign: "center"
      }}>

        <div style={{
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
        }}>
          ✓
        </div>

        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#111827" }}>
          Booking Confirmed!
        </h2>

        <p><strong>Bus ID:</strong> {busId}</p>
        <p>Seats Booked: <strong>{seats.join(", ")}</strong></p>
        <p>Price Per Seat: <strong>₹{pricePerSeat}</strong></p>

        <p style={{
          marginTop: "1rem",
          fontSize: "1.3rem",
          fontWeight: "bold",
          color: "#10B981"
        }}>
          Total Amount: ₹{totalPrice}
        </p>

        <button
          onClick={handlePayment}
          style={{
            marginTop: "1.5rem",
            padding: "0.7rem 2rem",
            backgroundColor: "#10B981",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "1.1rem"
          }}
        >
          Proceed to Payment
        </button>

        <Link to="/" style={{ display: "block", marginTop: "1.2rem" }}>
          <button style={{
            padding: "0.7rem 2rem",
            backgroundColor: "#3B82F6",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%"
          }}>
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
