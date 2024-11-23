const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import cors

const app = express();

app.use(cors()); // Kích hoạt CORS cho tất cả các yêu cầu
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sapassword',
  database: 'users'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware kiểm tra quyền admin
const checkAdmin = (req, res, next) => {
    const { userId } = req.body; // Lấy ID người dùng từ request
    const sql = 'SELECT role FROM users WHERE id = ?';
    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error checking role:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length > 0 && results[0].role === 'admin') {
            return next(); // Nếu là admin, tiếp tục
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }
    });
};

// Đăng ký người dùng với quyền
app.post('/api/register', (req, res) => {
    const { username, email, password, avatar, role = 'user' } = req.body;

    const sql = "INSERT INTO users (username, email, password, avatar, role) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [username, email, password, avatar, role], function(err, results) {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username or email already exists' });
            }
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
});

// Xóa người dùng chỉ dành cho admin
app.delete('/api/users/:id', checkAdmin, (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Đăng nhập, trả về vai trò
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT id, username, role, avatar FROM users WHERE username = ? AND password = ?";

    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results.length > 0) {
            const user = results[0];
            return res.json({ 
                userId: user.id,
                username: user.username,
                role: user.role, // Trả về role
                avatar: user.avatar 
            });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// Lấy danh sách người dùng (trừ admin)
app.get('/api/users', (req, res) => {
    const sql = 'SELECT id, username, email, avatar, role FROM users WHERE role != "admin"';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json({ users: results });
    });
});

// Khởi động server
app.listen(4000, () => {
  console.log('App listening on port 4000');
});
