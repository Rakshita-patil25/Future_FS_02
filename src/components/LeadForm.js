import React, { useState } from "react";
import axios from "axios";

function LeadForm({ fetchLeads }) {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/leads", lead);
    fetchLeads();

    setLead({
      name: "",
      email: "",
      phone: "",
      status: "New",
    });
  };

  return (
    <div>
      <h2>Add Customer</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={lead.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={lead.email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={lead.phone}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default LeadForm;