const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const bodyParser = require('body-parser');
const isAuthenticated = require('../middleware/authentication');
const csrf = require('../middleware/csrf')
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/index', isAuthenticated,csrf, userController.getIndex);

router.get('/flow-builder', isAuthenticated, csrf,userController.getFlowBuilder);
router.get('/form-page', isAuthenticated, csrf,userController.getFormPage);
router.post('/flow-builder', isAuthenticated,csrf, userController.postFlowBuilder);
router.post('/flow', isAuthenticated,csrf, userController.postFlow);

router.get('/profile', isAuthenticated,csrf, userController.getProfile);
router.get('/settings', isAuthenticated,csrf, userController.getSettings);
router.post('/settings', isAuthenticated,csrf, userController.postSettings);
router.get('/tasks', isAuthenticated,csrf, userController.getTasks);
router.get('/task-detail/:flowid', isAuthenticated,csrf, userController.getTask);
router.get('/flows', isAuthenticated,csrf, userController.getFlows);
router.get('/flow-detail/:flowid', isAuthenticated,csrf, userController.getFlow);
router.post('/desicion-accept', isAuthenticated,csrf, userController.postDesicionAccept);
router.post('/desicion-deny', isAuthenticated,csrf, userController.postDesicionDeny);
router.post('/search-user', isAuthenticated,csrf, userController.postSearchUser);
router.post('/profile',isAuthenticated,csrf,userController.postProfile);
module.exports = router;