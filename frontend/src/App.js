import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [leads, setLeads] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("New");
  const [followUp, setFollowUp] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://localhost:5000/api/leads";
  const AUTH_API = "http://localhost:5000/api/auth/login";

  useEffect(() => {
    if (token) fetchLeads();
  }, [token]);

  const fetchLeads = async () => {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLeads(res.data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(AUTH_API, {
        username,
        password,
      });
      setToken(res.data.token);
      setUsername("");
      setPassword("");
    } catch {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setToken("");
    setLeads([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone must be 10 digits");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert("Invalid email");
      return;
    }

    const data = {
      name,
      email,
      phone,
      source,
      status,
      followUp,
    };

    if (editingId) {
      await axios.put(`${API}/${editingId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(API, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setName("");
    setEmail("");
    setPhone("");
    setSource("");
    setStatus("New");
    setFollowUp("");
    setEditingId(null);

    fetchLeads();
  };

  const deleteLead = async (id) => {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchLeads();
  };

  const editLead = (lead) => {
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setSource(lead.source);
    setStatus(lead.status);
    setFollowUp(lead.followUp);
    setEditingId(lead._id);
  };

  const updateStatus = async (lead, newStatus) => {
    await axios.put(
      `${API}/${lead._id}`,
      { ...lead, status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchLeads();
  };

  const updateFollowUp = async (lead, text) => {
    await axios.put(
      `${API}/${lead._id}`,
      { ...lead, followUp: text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchLeads();
  };

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contacted = leads.filter((l) => l.status === "Contacted").length;
  const converted = leads.filter((l) => l.status === "Converted").length;

  if (!token) {
    return (
      <div style={loginPage}>
        <form onSubmit={handleLogin} style={loginBox}>
          <h2 style={{ color: "#1976d2", textAlign: "center" }}>
            🔐 Admin Login
          </h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button style={buttonStyle}>🚀 Login</button>
        </form>
      </div>
    );
  }

  return (
    <div
      style={{
        background: darkMode ? "#0d0d1a" : "#f4f6f9",
        minHeight: "100vh",
        padding: 30,
        color: darkMode ? "#e0e0f0" : "black",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: darkMode ? "#e0e0f0" : "black" }}>
          📊 Mini CRM Dashboard
        </h1>

        <div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={toggleBtn}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button onClick={handleLogout} style={buttonStyle}>
            🚪 Logout
          </button>
        </div>
      </div>

      <div style={cardGrid}>
        <div style={darkMode ? darkCardStyle : cardStyle}>👥 Total {total}</div>
        <div style={darkMode ? darkCardStyle : cardStyle}>🆕 New {newLeads}</div>
        <div style={darkMode ? darkCardStyle : cardStyle}>📞 Contacted {contacted}</div>
        <div style={darkMode ? darkCardStyle : cardStyle}>✅ Converted {converted}</div>
      </div>

      <div
        style={{
          ...formBox,
          background: darkMode ? "#13132b" : "white",
          color: darkMode ? "#e0e0f0" : "black",
          border: darkMode ? "1px solid #2a2a4a" : "none",
        }}
      >
        <h2>➕ Add Customer</h2>

        <form onSubmit={handleSubmit} style={formGrid}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={darkInput(darkMode)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={darkInput(darkMode)}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={darkInput(darkMode)}
          />

          <input
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={darkInput(darkMode)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={darkInput(darkMode)}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>

          <input
            placeholder="Follow up"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            style={darkInput(darkMode)}
          />

          <button style={{ ...buttonStyle, gridColumn: "span 2" }}>
            ➕ Add Customer
          </button>
        </form>
      </div>

      <table
        style={{
          ...tableStyle,
          background: darkMode ? "#13132b" : "white",
          color: darkMode ? "#e0e0f0" : "black",
          border: darkMode ? "1px solid #2a2a4a" : "none",
        }}
      >
        <thead>
          <tr style={{ background: darkMode ? "#1a1a3a" : "#f0f0f0" }}>
            <th style={thtdStyle}> Name</th>
            <th style={thtdStyle}> Email</th>
            <th style={thtdStyle}> Phone</th>
            <th style={thtdStyle}> Source</th>
            <th style={thtdStyle}> Status</th>
            <th style={thtdStyle}> FollowUp</th>
            <th style={thtdStyle}> Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              style={{ borderBottom: darkMode ? "1px solid #2a2a4a" : "1px solid #ddd" }}
            >
              <td style={thtdStyle}>{lead.name}</td>
              <td style={thtdStyle}>{lead.email}</td>
              <td style={thtdStyle}>{lead.phone}</td>
              <td style={thtdStyle}>{lead.source}</td>

              <td style={thtdStyle}>
                <select
                  value={lead.status}
                  onChange={(e) =>
                    updateStatus(lead, e.target.value)
                  }
                  style={darkInput(darkMode)}
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Converted</option>
                </select>
              </td>

              <td style={thtdStyle}>
                <input
                  value={lead.followUp}
                  onChange={(e) =>
                    updateFollowUp(lead, e.target.value)
                  }
                  style={darkInput(darkMode)}
                />
              </td>

              <td style={thtdStyle}>
                <button onClick={() => editLead(lead)}>
                  ✏️ Edit
                </button>

                <button
                  onClick={() => deleteLead(lead._id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const darkInput = (dark) => ({
  padding: 10,
  border: dark ? "1px solid #2a2a4a" : "1px solid #ccc",
  borderRadius: 5,
  background: dark ? "#1e1e3a" : "white",
  color: dark ? "#e0e0f0" : "black",
});

const loginPage = {
  background: "#e0e0e0",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const loginBox = {
  background: "white",
  padding: 40,
  borderRadius: 15,
  width: 350,
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const inputStyle = {
  padding: 10,
  border: "1px solid #ccc",
  borderRadius: 5,
};

const buttonStyle = {
  padding: 10,
  background: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
};

const toggleBtn = {
  marginRight: 10,
  padding: 10,
  fontSize: 18,
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 20,
  marginTop: 20,
};

const cardStyle = {
  background: "#1976d2",
  color: "white",
  padding: 20,
  borderRadius: 10,
  textAlign: "center",
};

// Dark mode card — deep navy with subtle border, matching screenshot
const darkCardStyle = {
  background: "#13132b",
  color: "#e0e0f0",
  padding: 20,
  borderRadius: 10,
  textAlign: "center",
  border: "1px solid #2a2a4a",
};

const formBox = {
  padding: 20,
  marginTop: 20,
  borderRadius: 10,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 15,
};

const tableStyle = {
  width: "100%",
  marginTop: 20,
  borderCollapse: "collapse",
};

const thtdStyle = {
  border: "1px solid #888",
  padding: 10,
  textAlign: "center",
};

export default App;
