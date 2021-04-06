const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/index',userController.getIndex);
router.get('/',userController.getLogin);

module.exports = router;