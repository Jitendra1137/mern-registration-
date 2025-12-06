const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/mern_users")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

const User = require("./models/User");

// Create User API
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password, phone, gender } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      phone,
      gender
    });

    await newUser.save();
    return res.status(201).json(newUser);

  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
});

// Get All Users API
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
});

// Get Single User API
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", err });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
