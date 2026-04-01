require("dotenv").config();

const mongoose = require("mongoose");
const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const createAdmin = async () => {
  try {
    await Admin.deleteMany();

    const admin = new Admin({
      username: "admin",
      password: "123456",
    });

    await admin.save();

    console.log("Admin created successfully");

    mongoose.connection.close();

  } catch (error) {
    console.log(error);
  }
};

createAdmin();