const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path'); // Jika perlu akses ke file statis

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const menu = require('./routes/menu.route');
const auth = require('./routes/auth.route');
const user = require('./routes/user.route');

// Set routes
app.use('/auth', auth);
app.use('/user', user);
app.use('/menu', menu);

// Static file serving (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
