import { useLocation, Link } from "react-router-dom";
import { jsPDF } from "jspdf";

export default function PaymentSuccess() {
  const location = useLocation();
  const { busId, seats, totalPrice, pricePerSeat } =
    location.state || {};

  const downloadTicket = () => {
    const doc = new jsPDF();

    // ========== HEADER ==========
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("🚌 BUS TICKET RECEIPT", 20, 20);

    // Line under header
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 25, 190, 25);

    // ========== TICKET BOX ==========
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 35, 180, 110, 5, 5, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");

    doc.text("Booking Details", 20, 45);

    doc.setFont("helvetica", "normal");

    doc.text(`Bus ID:`, 20, 60);
    doc.text(`${busId}`, 70, 60);

    doc.text(`Seats Booked:`, 20, 70);
    doc.text(`${seats?.join(", ")}`, 70, 70);

    doc.text(`Price Per Seat:`, 20, 80);
    doc.text(`₹${pricePerSeat}`, 70, 80);

    doc.text(`Total Amount Paid:`, 20, 90);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text(`₹${totalPrice}`, 70, 90);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");

    const date = new Date().toLocaleString();
    doc.text(`Payment Date & Time:`, 20, 105);
    doc.text(`${date}`, 70, 105);

    // ========== FOOTER ==========
    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120);
    doc.text("Thank you for booking with BusGo!", 20, 140);

    doc.save("Bus_Ticket.pdf");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #22c55e, #4ade80)",
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
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "#16a34a",
            fontWeight: "bold",
          }}
        >
          ✅ Payment Successful!
        </h2>

        <p>Your ticket is ready.</p>

        {/* DOWNLOAD PDF BUTTON */}
        <button
          onClick={downloadTicket}
          style={{
            marginTop: "1.5rem",
            padding: "0.7rem 2rem",
            backgroundColor: "#EF4444",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "1.1rem",
          }}
        >
          Download Ticket PDF
        </button>

        <Link to="/" style={{ display: "block", marginTop: "1.2rem" }}>
          <button
            style={{
              padding: "0.7rem 2rem",
              backgroundColor: "#3B82F6",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
