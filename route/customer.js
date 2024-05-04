// Requied routes
const route = require('express').Router();

// required middleware
const isauth = require('../middleware/auth');
const validate = require('../middleware/validation');

// Required controller
const customer = require('../controller/customer');

// Register Customer data
route.post('/api/auth/register', validate.signupV, customer.addcustomer);

// Login 
route.post('/api/auth/login', validate.loginV, customer.login);

// Get list of customers
route.get('/api/customers', isauth, customer.getlist);

// Create a new customer using authentication
route.post('/api/customers', isauth, validate.signupV, customer.addcustomer);

// Fetch specific customer
route.get('/api/customers/:id', isauth, customer.getcustomer);

// update the exisitng customer
route.put('/api/customers/:id', isauth, customer.editcustomer);

// Delete customer
route.delete('/api/customers/:id', isauth, customer.deletecustomer);

module.exports = route;