📊 Mini CRM Dashboard
A full-stack Customer Relationship Management (CRM) web application built with React, Node.js, Express, and MongoDB.
---
🚀 Features
🔐 Admin login with JWT authentication
➕ Add, edit, delete customer leads
📋 Track lead status: New → Contacted → Converted
📝 Follow-up notes for each lead
📊 Dashboard stats (Total, New, Contacted, Converted)
🌙 Dark mode support
---
🛠️ Tech Stack
Frontend	Backend
React.js	Node.js
Axios	Express.js
CSS (inline styles)	MongoDB + Mongoose
	JWT Authentication
---
⚙️ Setup Instructions
1. Clone the repository
```
git clone https://github.com/YOUR\_USERNAME/Mini-CRM.git
cd Mini-CRM
```
2. Backend Setup
```
cd backend
npm install
```
Create a `.env` file inside `backend/` folder:
```
MONGO\_URI=your\_mongodb\_connection\_string
JWT\_SECRET=your\_jwt\_secret\_key
PORT=5000
```
Start the backend:
```
node server.js
```
3. Frontend Setup
```
cd frontend
npm install
npm start
```
---
🔑 Default Admin Login
Run this once to create admin credentials:
```
cd backend
node seedAdmin.js
```
---
📁 Project Structure
```
Mini-CRM/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```
---
🙋‍♂️ Author
Built during internship at Future Interns
