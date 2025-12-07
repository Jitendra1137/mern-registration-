const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ---- Middleware ----
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// ---- MongoDB Connection ----
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// ---- Model ----
const User = require("./models/User");

// ---- Create User ----
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password, phone, gender } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      phone,
      gender,
    });

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
});

// ---- Get All Users ----
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
});

// ---- ✅ Get Single User (FIXED & SAFE) ----
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ---- Server Listen ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Server running on port ${PORT}`)
);
