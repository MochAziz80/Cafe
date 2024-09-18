const express = require('express'); // Tambahkan ini
const mysql = require('mysql2');
const cors = require('cors'); // Tambahkan ini juga jika belum diimpor

const app = express();

const PORT = 8000;

app.use(cors());
app.use(express.json());

const auth = require('./routes/auth.route');
const user = require('./routes/user.route');
const menu = require('./routes/menu.route');

app.use('/auth', auth);
app.use('/user', user);
app.use('/menu', menu);

// Membuat koneksi ke database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL kamu
  password: '', // Ganti dengan password MySQL kamu
  database: 'cafeukk', // Nama database yang digunakan
});

// Mengecek koneksi
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// connection.end();

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});
