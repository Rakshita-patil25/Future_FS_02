import React from "react";
import axios from "axios";

function LeadList({ leads, fetchLeads }) {

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/leads/${id}`);
      fetchLeads(); // refresh list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Leads</h2>

      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>
            {lead.name} | {lead.email} | {lead.phone} | {lead.status}

            <button
              style={{ marginLeft: "10px", color: "white", background: "red" }}
              onClick={() => deleteLead(lead._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeadList;