require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Admin.deleteMany();

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await admin.save();

    console.log("Admin created successfully");

    mongoose.connection.close();

  } catch (error) {
    console.log(error);
  }
};

createAdmin();