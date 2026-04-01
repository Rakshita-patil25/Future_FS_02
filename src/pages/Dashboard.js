import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("New");
  const [followUp, setFollowUp] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const API = "http://localhost:5000/api/leads";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/";
      return;
    }

    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(res.data);
    } catch (error) {
      console.log(error);
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const leadData = {
        name,
        email,
        phone,
        source,
        status,
        followUp,
      };

      if (editingId) {
        await axios.put(`${API}/${editingId}`, leadData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(API, leadData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert("Customer saved successfully");

      setName("");
      setEmail("");
      setPhone("");
      setSource("");
      setStatus("New");
      setFollowUp("");
      setEditingId(null);

      fetchLeads();

    } catch (error) {
      console.log(error);
      alert("Error saving lead. Make sure you are logged in.");
    }
  };

  const deleteLead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchLeads();

    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const editLead = (lead) => {
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setSource(lead.source);
    setStatus(lead.status);
    setFollowUp(lead.followUp || "");
    setEditingId(lead._id);
  };

  const updateStatus = async (lead, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/${lead._id}`,
        { ...lead, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const updateFollowUp = async (lead, text) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/${lead._id}`,
        { ...lead, followUp: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const converted = leads.filter((l) => l.status === "Converted").length;
  const followUpCount = leads.filter(
    (l) => l.followUp && l.followUp.trim() !== ""
  ).length;

  return (
    <div
      style={{
        background: darkMode ? "#121212" : "#f4f6f9",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        padding: 30,
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Admin Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ padding: 10, borderRadius: 8 }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 20,
          marginTop: 20,
        }}
      >
        <div style={cardStyle(darkMode)}>📊 Total: {total}</div>
        <div style={cardStyle(darkMode)}>🆕 New: {newLeads}</div>
        <div style={cardStyle(darkMode)}>📞 Contacted: {contacted}</div>
        <div style={cardStyle(darkMode)}>✅ Converted: {converted}</div>
        <div style={cardStyle(darkMode)}>⏰ Follow-up: {followUpCount}</div>
      </div>

      {/* Form */}
      <div style={formBox(darkMode)}>
        <h2>{editingId ? "Edit Lead" : "Add Customer"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={inputStyle}
          />

          <button style={buttonStyle}>
            {editingId ? "Update Lead" : "Add Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}

const cardStyle = (dark) => ({
  background: dark ? "#1e1e1e" : "#2196f3",
  color: "white",
  padding: 20,
  borderRadius: 10,
  textAlign: "center",
});

const formBox = (dark) => ({
  background: dark ? "#1e1e1e" : "#2196f3",
  padding: 20,
  borderRadius: 10,
  width: 400,
  margin: "auto",
  color: "white",
});

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 5,
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  background: "#0d47a1",
  color: "white",
  border: "none",
  borderRadius: 5,
};

export default Dashboard;