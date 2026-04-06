require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");  // ✅ bcrypt import not needed anymore

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Admin.deleteMany();

    const admin = new Admin({
      username: "admin",
      password: "123456",  // ✅ plain text
    });

    await admin.save();  // pre-save hook hashes it once

    console.log("Admin created successfully");
    mongoose.connection.close();

  } catch (error) {
    console.log(error);
  }
};

createAdmin();