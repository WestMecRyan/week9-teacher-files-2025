const express = require("express");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(express.json());

// Generate JWT
app.post("/generate-token", (req, res) => {
  const { username } = req.body;
  const token = jwt.sign(
    { username, timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ success: true, token });
});

app.post("/verify-token", (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, decoded, message: "Token is valid!" });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});
// DB initialization

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
let db;

MongoClient.connect(MONGODB_URI)
  .then((client) => {
    console.log("connected to mongoDB atlas!");
    db = client.db("test-database");
  })
  .catch((error) => console.error("MongoDB Connection Error", error));

app.post("/test-mongodb", async (req, res) => {
  try {
    const result = await db.collection("students").insertOne(req.body);
    res.json({
      success: true,
      message: "Data inserted successfully!",
      insertedId: result.insertedId,
    });
  } catch (e) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/test-data", async (req, res) => {
  try {
    const data = await db.collection("students").find({}).toArray();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete("/test-data/clear", async (req, res) => {
  try {
    const result = await db.collection("students").deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} documents`,
    });
  } catch (e) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Test server running on http://localhost:3000");
});
