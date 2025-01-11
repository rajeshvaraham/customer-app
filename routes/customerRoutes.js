const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to add a customer
router.post('/', customerController.addCustomer);

// Route to get all customers
router.get('/', customerController.getCustomers);

module.exports = router;
