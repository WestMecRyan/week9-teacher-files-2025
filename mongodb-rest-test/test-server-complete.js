const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
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

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

// Create one document (existing)
app.post("/test-mongodb", async (req, res) => {
  try {
    const result = await db.collection("students").insertOne(req.body);
    res.json({
      success: true,
      message: "Data inserted successfully!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create multiple documents
app.post("/test-mongodb/many", async (req, res) => {
  try {
    const result = await db.collection("students").insertMany(req.body); // Expects array
    res.json({
      success: true,
      message: `${result.insertedCount} documents inserted!`,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// READ OPERATIONS
// ============================================================================

// Find all (existing)
app.get("/test-data", async (req, res) => {
  try {
    const data = await db.collection("students").find({}).toArray();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find by ID
app.get("/test-data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.collection("students").findOne({ _id: new ObjectId(id) });

    if (!data) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find one by criteria
app.get("/test-data/find-one/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const data = await db.collection("students").findOne({ email: email });

    if (!data) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find with query parameters
app.get("/test-data/search/age", async (req, res) => {
  try {
    const { min, max } = req.query; // ?min=20&max=30
    const query = {};

    if (min || max) {
      query.age = {};
      if (min) query.age.$gte = parseInt(min);
      if (max) query.age.$lte = parseInt(max);
    }

    const data = await db.collection("students").find(query).toArray();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

// Update one document by ID
app.put("/test-data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student updated successfully!",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update many documents
app.put("/test-data/update-many/age", async (req, res) => {
  try {
    const { filter, update } = req.body;
    // Example: { "filter": {"age": 25}, "update": {"age": 26} }

    const result = await db.collection("students").updateMany(filter, { $set: update });

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} documents`,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find and update (returns the updated document)
app.put("/test-data/:id/find-update", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection("students").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' } // Return updated document
    );

    if (!result.value) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student updated successfully!",
      data: result.value
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Replace one document entirely
app.put("/test-data/:id/replace", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection("students").replaceOne(
      { _id: new ObjectId(id) },
      req.body // Completely replaces the document
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student replaced successfully!",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// DELETE OPERATIONS
// ============================================================================

// Delete one by ID
app.delete("/test-data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection("students").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student deleted successfully!",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find and delete (returns the deleted document)
app.delete("/test-data/:id/find-delete", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection("students").findOneAndDelete({ _id: new ObjectId(id) });

    if (!result.value) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({
      success: true,
      message: "Student deleted successfully!",
      deletedDocument: result.value
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete many by criteria
app.delete("/test-data/delete-many/age", async (req, res) => {
  try {
    const { filter } = req.body; // Example: {"age": 25}
    const result = await db.collection("students").deleteMany(filter);

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} students`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete all (existing)
app.delete("/test-data/clear", async (req, res) => {
  try {
    const result = await db.collection("students").deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} documents`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// UTILITY ROUTES
// ============================================================================

// Count documents
app.get("/test-data/count/all", async (req, res) => {
  try {
    const count = await db.collection("students").countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get collection stats
app.get("/test-data/stats", async (req, res) => {
  try {
    const stats = await db.collection("students").stats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Test server running on http://localhost:3000");
  console.log("\nAvailable endpoints:");
  console.log("POST   /test-mongodb          - Create one student");
  console.log("POST   /test-mongodb/many     - Create multiple students");
  console.log("GET    /test-data             - Get all students");
  console.log("GET    /test-data/:id         - Get student by ID");
  console.log("GET    /test-data/find-one/:email - Find by email");
  console.log("GET    /test-data/search/age?min=20&max=30 - Search by age range");
  console.log("PUT    /test-data/:id         - Update student by ID");
  console.log("PUT    /test-data/update-many/age - Update multiple students");
  console.log("PUT    /test-data/:id/find-update - Update and return document");
  console.log("PUT    /test-data/:id/replace - Replace entire document");
  console.log("DELETE /test-data/:id         - Delete by ID");
  console.log("DELETE /test-data/:id/find-delete - Delete and return document");
  console.log("DELETE /test-data/delete-many/age - Delete multiple students");
  console.log("DELETE /test-data/clear       - Delete all students");
});