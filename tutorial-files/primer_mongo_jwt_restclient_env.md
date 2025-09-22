# MongoDB, Environment Variables, and JWT: Student Primer

Based on common student questions, here's a comprehensive guide to get you started with modern web development tools.

## Part 1: MongoDB Atlas Setup

### What is MongoDB Atlas?
MongoDB Atlas is a **cloud database service** - instead of storing data in local JSON files, your data lives in the cloud and can be accessed from anywhere.

### Step-by-Step Setup:

**1. Create Account**
- Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Sign up for free account
- Choose "Build a database" → "Free" tier

**2. Understanding the Two Passwords**
You'll create **two different passwords**:
- **Atlas Account Password**: For logging into the MongoDB website
- **Database User Password**: For your app to connect to the database (this goes in your code)

**3. Create Database User**
- Go to "Database Access" → "Add New Database User"
- Username: `student` (or your choice)
- **Important**: Save the auto-generated password - you'll need it later!

**4. Network Access**
- Go to "Network Access" → "Add IP Address"
- Choose "Allow Access from Anywhere" (for development only)

**5. Get Connection String**
- Go to "Database" → "Connect" → "Connect your application"
- Copy the URI - looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`
- **Replace `<password>` with your actual database user password**

## Part 2: Environment Variables (.env files)

### What are Environment Variables?
Think of environment variables as **secret configuration files** that:
- Keep sensitive data (passwords, API keys) out of your code
- Allow the same code to work in development and production
- Prevent accidentally sharing secrets on GitHub

### How process.env Works:

**Your .env file:**
```env
PORT=3000
JWT_SECRET=my-super-secret-key
MONGODB_URI=mongodb+srv://student:mypassword@cluster.mongodb.net/...
```

**In your Node.js code:**
```javascript
require('dotenv').config(); // This loads .env into process.env

console.log(process.env.PORT);        // "3000"
console.log(process.env.JWT_SECRET);  // "my-super-secret-key"
```

### Setting Up Environment Variables:

**1. Install dotenv:**
```bash
npm install dotenv
```

**2. Create .env file in your project root:**
```env
MONGO_USER=your-username
MONGO_PASSWORD=your-actual-db-password
MONGO_CLUSTER=cluster0.abc123.mongodb.net
JWT_SECRET=student-demo-jwt-secret-2024
PORT=3000
```

**3. Add to your server.js:**
```javascript
require('dotenv').config(); // Must be at the top!

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;
```

**4. IMPORTANT: Add .env to .gitignore**
```gitignore
.env
node_modules/
```

### Real-World Example:
- **Development**: Uses local test database, fake API keys
- **Production**: Uses real database, real payment processing keys
- **Same code, different .env files!**

## Part 3: VS Code REST Client

### What is REST Client?
A VS Code extension that lets you test your API endpoints without leaving your editor.

### Setup:
1. Install "REST Client" extension in VS Code
2. Create a `.http` file
3. Write HTTP requests with proper formatting

### Important Formatting Rules:
```http
### This is a comment/separator
POST http://localhost:3000/api/users
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com"
}
```

**Key points:**
- `###` creates request separators
- **Blank line** required between headers and JSON body
- No extra spaces before `POST`, `GET`, etc.

## Part 4: JWT (JSON Web Tokens)

### When Do You Need JWT?
**You DON'T need JWT for:**
- Public data (weather, news articles)
- Basic CRUD testing
- Open APIs anyone can access

**You DO need JWT for:**
- User login/registration
- Protected user data ("show MY posts")
- Role-based permissions ("only admins can delete")
- Any "who is this user?" scenarios

### How JWT Works:
1. **User logs in** → Server creates JWT token
2. **User makes requests** → Includes JWT token
3. **Server verifies token** → Allows/denies access

### Basic JWT Example:
```javascript
// Generate token when user logs in
const token = jwt.sign(
    { userId: 123, username: "john" },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);

// Verify token on protected routes
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded.userId); // 123
```

## Part 5: Putting It All Together

### Sample Test Server:
```javascript
const express = require('express');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json());

// Use environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
let db;
MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('✅ Connected to MongoDB Atlas!');
    db = client.db('test-database');
  })
  .catch(error => console.error('❌ MongoDB error:', error));

// Test routes
app.post('/test-data', async (req, res) => {
  try {
    const result = await db.collection('students').insertOne(req.body);
    res.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### Sample .http file:
```http
### Test MongoDB Connection
POST http://localhost:3000/test-data
Content-Type: application/json

{
    "name": "Student Test",
    "email": "student@example.com",
    "timestamp": "2024-01-15"
}

### Generate JWT Token (demo)
POST http://localhost:3000/generate-token
Content-Type: application/json

{
    "username": "student123"
}
```

## Common Issues & Solutions:

**"Authentication failed"**
- Check you're using the **database user password**, not your Atlas account password
- Verify the password is correct in your .env file

**"IP not whitelisted"**
- Go to Network Access in Atlas and add 0.0.0.0/0

**"Header name must be a valid HTTP token"**
- Check formatting in your .http file
- Ensure blank line between headers and JSON body
- No extra characters before HTTP methods

**Environment variables not working**
- Make sure `require('dotenv').config()` is at the top of your file
- Check .env file is in project root
- Verify no spaces around = in .env file

## Next Steps:
1. **Master this foundation**: Get comfortable with MongoDB Atlas, environment variables, and REST testing
2. **Add authentication**: Implement user registration/login with JWT
3. **Secure your routes**: Add JWT middleware to protect sensitive endpoints
4. **Deploy to production**: Learn how environment variables work in cloud platforms

Remember: Start simple, test everything, and ask questions when stuck!