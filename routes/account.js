const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const bodyParser = require('body-parser');


router.get('/',accountController.getLogin);
router.post('/login',accountController.postLogin);

router.get('/logout',accountController.getLogout);

module.exports = router;