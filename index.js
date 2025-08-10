// index.js (Backend)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://javeriamasood123:Rajput97531@cluster0.yhlok3q.mongodb.net/myDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Schema
const messageSchema = new mongoose.Schema({
  text: String,
});
const Message = mongoose.model("Message", messageSchema);

// API route to save message
app.post("/send", async (req, res) => {
  try {
    const newMessage = new Message({ text: req.body.text });
    await newMessage.save();
    res.json({ success: true, message: "Message saved successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API route to get all messages
app.get("/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

