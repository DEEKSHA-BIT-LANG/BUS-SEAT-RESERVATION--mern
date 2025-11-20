import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBuses() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(""); // optional
  const [buses, setBuses] = useState([]);

  // Hardcoded popular buses
  const popularBuses = [
    { id: 101, name: "Karnataka Express", from: "Bangalore", to: "Mysore", price: 250 },
    { id: 102, name: "Mysore Comfort", from: "Bangalore", to: "Mysore", price: 270 },
    { id: 103, name: "Coorg Travels", from: "Bangalore", to: "Coorg", price: 400 },
  ];

  const handleSearch = async () => {
    if (!from || !to) {
      alert("Please enter both From and To locations.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/buses/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Error fetching buses.");
        return;
      }

      const data = await res.json();
      setBuses(data || []);
      if (data.length === 0) alert("No buses found for this route.");
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#F3F4F6", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Search Buses</h2>

      {/* Search Inputs */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ padding: "0.7rem", marginRight: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <input
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ padding: "0.7rem", marginRight: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "0.7rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "0.7rem 1rem",
            marginLeft: "1rem",
            backgroundColor: "#3B82F6",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Searched Bus List */}
      {buses.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          {buses.map((bus) => (
            <div
              key={bus._id}
              style={{
                backgroundColor: "white",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{bus.name}</h3>
              <p>
                {bus.from} → {bus.to}
              </p>
              <p>Price: ₹{bus.price}</p>
              <Link to={`/seats/${bus._id}`}>
                <button
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#10B981",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Select Seats
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Popular Buses</h2>

      {/* Popular Buses */}
      <div>
        {popularBuses.map((bus) => (
          <div
            key={bus.id}
            style={{
              backgroundColor: "#FEF3C7",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{bus.name}</h3>
            <p>
              {bus.from} → {bus.to}
            </p>
            <p>Price: ₹{bus.price}</p>
            {/* Removed button to prevent errors */}
          </div>
        ))}
      </div>
    </div>
  );
}
