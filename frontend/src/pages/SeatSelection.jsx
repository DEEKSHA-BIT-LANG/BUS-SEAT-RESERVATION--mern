import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SeatSelection() {
  const { busId } = useParams();
  const navigate = useNavigate();

  const totalSeats = 20;

  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [busPrice, setBusPrice] = useState(0); // Price per seat

  // --- Fetch bus details (price) ---
  useEffect(() => {
    fetch(`http://localhost:5000/api/buses/${busId}`)
      .then(res => res.json())
      .then(data => setBusPrice(data.price || 0))
      .catch(err => console.error("Error fetching bus:", err));
  }, [busId]);

  // --- Fetch already booked seats ---
  useEffect(() => {
    fetch(`http://localhost:5000/api/buses/${busId}/seats`)
      .then(res => res.json())
      .then(data => setBookedSeats(data.seats || []))
      .catch(err => console.error("Error fetching seats:", err));
  }, [busId]);

  // --- Toggle seat selection ---
  const toggleSeat = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      alert("This seat is already booked!");
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // --- Book selected seats ---
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/buses/${busId}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seats: selectedSeats })
      });

      const data = await res.json();

      if (res.ok) {
        const totalAmount = selectedSeats.length * busPrice;

        navigate("/booking", {
          state: {
            busId,
            seats: selectedSeats,
            totalPrice: totalAmount,
            pricePerSeat: busPrice
          }
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#F3F4F6" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Select Your Seats</h2>

      <p style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
        Price Per Seat: <strong>₹{busPrice}</strong>
      </p>
      <p style={{ marginBottom: "2rem", fontSize: "1.2rem" }}>
        Total: <strong>₹{selectedSeats.length * busPrice}</strong>
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 60px)",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        {[...Array(totalSeats)].map((_, index) => {
          const seatNumber = index + 1;
          const isBooked = bookedSeats.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          let bgColor = "#E5E7EB";
          let textColor = "black";

          if (isBooked) {
            bgColor = "#EF4444";
            textColor = "white";
          } else if (isSelected) {
            bgColor = "#10B981";
            textColor = "white";
          }

          return (
            <div
              key={seatNumber}
              onClick={() => toggleSeat(seatNumber)}
              style={{
                width: "60px",
                height: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: bgColor,
                color: textColor,
                fontWeight: "bold",
                borderRadius: "8px",
                cursor: isBooked ? "not-allowed" : "pointer",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                transition: "0.2s"
              }}
            >
              {seatNumber}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleBooking}
        disabled={selectedSeats.length === 0}
        style={{
          padding: "0.7rem 2rem",
          backgroundColor: selectedSeats.length > 0 ? "#3B82F6" : "#9CA3AF",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: selectedSeats.length > 0 ? "pointer" : "not-allowed"
        }}
      >
        Book Seats ({selectedSeats.length})
      </button>
    </div>
  );
}
