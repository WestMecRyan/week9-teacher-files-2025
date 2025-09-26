const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

// ============================================================================
// JWT ROUTES
// ============================================================================

// Generate JWT token
app.post("/auth/token", (req, res) => {
  const { username } = req.body;
  const token = jwt.sign(
    { username, timestamp: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ success: true, token });
});

// Verify JWT token
app.post("/auth/verify", (req, res) => {
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

// ============================================================================
// DATABASE INITIALIZATION
// ============================================================================

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
let db;

MongoClient.connect(MONGODB_URI)
  .then((client) => {
    console.log("✅ Connected to MongoDB Atlas!");
    db = client.db("test-database");
  })
  .catch((error) => console.error("❌ MongoDB Connection Error", error));

// ============================================================================
// CREATE OPERATIONS
// ============================================================================

// Create one student
app.post("/students", async (req, res) => {
  try {
    const result = await db.collection("students").insertOne(req.body);
    res.status(201).json({
      success: true,
      message: "Student created successfully!",
      insertedId: result.insertedId,
      data: { _id: result.insertedId, ...req.body }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create multiple students
app.post("/students/bulk", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        error: "Request body must be an array"
      });
    }

    const result = await db.collection("students").insertMany(req.body);
    res.status(201).json({
      success: true,
      message: `${result.insertedCount} students created!`,
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// READ OPERATIONS
// ============================================================================

// Get all students
app.get("/students", async (req, res) => {
  try {
    const data = await db.collection("students").find({}).toArray();
    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get one student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ObjectId format"
      });
    }

    const data = await db.collection("students").findOne({ _id: new ObjectId(id) });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search students with query parameters
app.get("/students/search", async (req, res) => {
  try {
    const { name, email, minAge, maxAge } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (email) {
      query.email = email;
    }

    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = parseInt(minAge);
      if (maxAge) query.age.$lte = parseInt(maxAge);
    }

    const data = await db.collection("students").find(query).toArray();
    res.json({
      success: true,
      count: data.length,
      query: query,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Find students by email (specific field lookup)
app.get("/students/by-email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const data = await db.collection("students").findOne({ email: email });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Advanced query with filters
app.post("/students/query", async (req, res) => {
  try {
    const { filter, sort, limit } = req.body;

    let cursor = db.collection("students").find(filter || {});

    if (sort) cursor = cursor.sort(sort);
    if (limit) cursor = cursor.limit(parseInt(limit));

    const data = await cursor.toArray();

    res.json({
      success: true,
      count: data.length,
      filter: filter,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Count students
app.get("/students/count", async (req, res) => {
  try {
    const { age, email } = req.query;
    const filter = {};

    if (age) filter.age = parseInt(age);
    if (email) filter.email = email;

    const count = await db.collection("students").countDocuments(filter);
    res.json({ success: true, count, filter });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get collection statistics
app.get("/students/stats", async (req, res) => {
  try {
    const stats = await db.collection("students").stats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// UPDATE OPERATIONS
// ============================================================================

// Update one student by ID
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ObjectId format"
      });
    }

    const result = await db.collection("students").updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.json({
      success: true,
      message: "Student updated successfully!",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update one student and return the updated document
app.put("/students/:id/return", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ObjectId format"
      });
    }

    const result = await db.collection("students").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
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

// Update multiple students
app.put("/students/bulk", async (req, res) => {
  try {
    const { filter, update } = req.body;

    if (!filter || !update) {
      return res.status(400).json({
        success: false,
        error: "Both 'filter' and 'update' are required"
      });
    }

    const result = await db.collection("students").updateMany(
      filter,
      { $set: update }
    );

    res.json({
      success: true,
      message: `Updated ${result.modifiedCount} students`,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      filter: filter,
      update: update
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Replace entire student document
app.put("/students/:id/replace", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ObjectId format"
      });
    }

    const result = await db.collection("students").replaceOne(
      { _id: new ObjectId(id) },
      req.body
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
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

// Delete one student by ID
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ObjectId format"
      });
    }

    const result = await db.collection("students").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
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

// Delete one student and return the deleted document
app.delete("/students/:id/return", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ObjectId format"
      });
    }

    const result = await db.collection("students").findOneAndDelete({
      _id: new ObjectId(id)
    });

    if (!result.value) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
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

// Delete multiple students by filter
app.delete("/students/bulk", async (req, res) => {
  try {
    const { filter } = req.body;

    if (!filter || Object.keys(filter).length === 0) {
      return res.status(400).json({
        success: false,
        error: "Filter is required. Use DELETE /students/all to delete everything"
      });
    }

    const result = await db.collection("students").deleteMany(filter);

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} students`,
      deletedCount: result.deletedCount,
      filter: filter
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete ALL students (dangerous!)
app.delete("/students/all", async (req, res) => {
  try {
    const result = await db.collection("students").deleteMany({});
    res.json({
      success: true,
      message: `⚠️ Deleted ALL ${result.deletedCount} students`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("\n📚 STUDENT API ENDPOINTS:");
  console.log("\n=== CREATE ===");
  console.log("POST   /students              - Create one student");
  console.log("POST   /students/bulk         - Create multiple students");

  console.log("\n=== READ ===");
  console.log("GET    /students              - Get all students");
  console.log("GET    /students/:id          - Get student by ID");
  console.log("GET    /students/search?name=John&minAge=20 - Search students");
  console.log("GET    /students/by-email/:email - Find by email");
  console.log("POST   /students/query        - Advanced query with filters");
  console.log("GET    /students/count?age=25 - Count students");
  console.log("GET    /students/stats        - Collection statistics");

  console.log("\n=== UPDATE ===");
  console.log("PUT    /students/:id          - Update student by ID");
  console.log("PUT    /students/:id/return   - Update and return document");
  console.log("PUT    /students/bulk         - Update multiple students");
  console.log("PUT    /students/:id/replace  - Replace entire document");

  console.log("\n=== DELETE ===");
  console.log("DELETE /students/:id          - Delete by ID");
  console.log("DELETE /students/:id/return   - Delete and return document");
  console.log("DELETE /students/bulk         - Delete multiple (with filter)");
  console.log("DELETE /students/all          - Delete ALL students ⚠️");

  console.log("\n=== AUTH ===");
  console.log("POST   /auth/token            - Generate JWT token");
  console.log("POST   /auth/verify           - Verify JWT token");
  console.log("\n" + "=".repeat(50));
});