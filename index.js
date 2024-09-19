const express = require('express');
const cors = require('cors');
const path = require('path'); 

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const menu = require('./routes/menu.route');
const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const meja = require('./routes/meja.route')

// Set routes
app.use('/auth', auth);
app.use('/user', user);
app.use('/menu', menu);
app.use('/meja', meja)

// Static file serving (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
