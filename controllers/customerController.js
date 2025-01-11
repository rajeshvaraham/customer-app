const db = require('../config/db');

// Add a new customer
exports.addCustomer = (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const query = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
    db.query(query, [name, email, phone], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Customer added successfully', customerId: results.insertId });
    });
};

// Get all customers
exports.getCustomers = (req, res) => {
    const query = 'SELECT * FROM customers';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};
