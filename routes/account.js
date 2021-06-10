const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const bodyParser = require('body-parser');
const csrf = require('../middleware/csrf')

router.get('/',csrf,accountController.getLogin);
router.post('/login',csrf,accountController.postLogin);

router.get('/logout',csrf,accountController.getLogout);
router.get('/forgot-password',csrf,accountController.getForgotPassword)
router.post('/forgot-password',accountController.postForgotPassword)

module.exports = router;