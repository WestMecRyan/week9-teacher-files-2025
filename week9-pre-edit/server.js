const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');
const userDBfilePath = path.join(__dirname, 'data', 'usersDB.json');
const PORT = 3000;

// Helper functions
const readFile = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.log('No users file found, starting with empty array');
    return [];
  }
};

const writeFile = (filePath, data) => {
  // Ensure data directory exists
  const dataDir = path.dirname(filePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get('/', (req, res) => {
  res.render('form');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/users/list', (req, res) => {
  const users = readFile(userDBfilePath);
  res.render('usersList', { users });
});

app.post('/form/new', (req, res) => {
  console.log('received data', req.body);
  const users = readFile(userDBfilePath);
  const newUser = {
    ...req.body,
    id: (
      Date.now() + parseFloat(Math.floor(Math.random().toFixed(3) * 1000))
    ).toString(),
  };
  users.push(newUser);
  writeFile(userDBfilePath, users);
  res.json({
    success: true,
    message: 'data added to database,',
    data: req.body,
    redirectTo: '/users/list',
  });
});

app.delete('/users/:id', (req, res) => {
  console.log(req.params);
  const userId = req.params.id;
  const users = readFile(userDBfilePath);
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  users.splice(userIndex, 1);
  writeFile(userDBfilePath, users);
  res.json({ success: true, message: 'User deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); // listen on PORT
