require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Atlas Connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.deleteMany({});

    const admin = new Admin({
      username: "admin2",
      password: hashedPassword
    });

    await admin.save();

    console.log("Admin created successfully");

    mongoose.disconnect();

  } catch (error) {
    console.log("Error:", error);
  }
}

createAdmin();