const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const bodyParser = require('body-parser');
const isAuthenticated = require('../middleware/authentication');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/index', isAuthenticated, userController.getIndex);

router.get('/elements', userController.getElements);
router.get('/charts', userController.getCharts);
router.get('/panels', userController.getPanels);
router.get('/notifications', userController.getNotifications);
router.get('/pages', userController.getPages);

router.get('/lock-screen', userController.getLockScreen);
router.get('/tables', userController.getTables);
router.get('/typography', userController.getTypography);
router.get('/icons', userController.getIcons);
router.get('/delete-faculty', userController.getDeleteFaculty);
router.get('/add-department', userController.getAddDepartment);

router.get('/delete-department', userController.getDeleteDepartment);
router.get('/faculties', userController.getFaculties);
router.get('/flow-builder', isAuthenticated, userController.getFlowBuilder);
router.get('/form-page', isAuthenticated, userController.getFormPage);
router.post('/flow-builder', isAuthenticated, userController.postFlowBuilder);
router.post('/flow', isAuthenticated, userController.postFlow);

router.get('/profile', isAuthenticated, userController.getProfile);
router.get('/settings', isAuthenticated, userController.getSettings);
router.post('/settings', isAuthenticated, userController.postSettings);
router.get('/tasks', isAuthenticated, userController.getTasks);
router.get('/task-detail/:flowid', isAuthenticated, userController.getTask);
router.get('/flows', isAuthenticated, userController.getFlows);
router.get('/flow-detail/:flowid', isAuthenticated, userController.getFlow);
router.post('/desicion-accept', isAuthenticated, userController.postDesicionAccept);
router.post('/desicion-deny', isAuthenticated, userController.postDesicionDeny);
router.post('/search-user', isAuthenticated, userController.postSearchUser);
router.post('/profile',isAuthenticated,userController.postProfile);
module.exports = router;