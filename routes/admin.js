const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');
const viewmw = require('../middleware/viewmiddleware'); 
//const productController = require('../controllers/products');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/add-user', adminController.getAddUser);
router.post('/add-user', adminController.postAddUser);

router.get('/users',adminController.getUserList);

module.exports = router;
