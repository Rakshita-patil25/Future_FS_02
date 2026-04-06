router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received:", username, password);

    const admin = await Admin.findOne({ username });

    console.log("Admin from DB:", admin);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      username: admin.username
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});