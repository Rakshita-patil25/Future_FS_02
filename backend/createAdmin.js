require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Atlas Connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  try {

    const existingAdmin = await Admin.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword
    });

    await admin.save();

    console.log("Admin created successfully");

    mongoose.disconnect();

  } catch (error) {
    console.log(error);
  }
}

createAdmin();