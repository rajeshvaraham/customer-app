require('dotenv').config();  // Load environment variables from .env file

const mysql = require('mysql2');  // Use mysql2 instead of mysql

// Create MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;