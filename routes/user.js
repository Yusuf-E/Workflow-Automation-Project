const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/index', userController.getIndex);


router.get('/reset-password', userController.getResetPassword);
router.get('/elements', userController.getElements);
router.get('/charts', userController.getCharts);
router.get('/panels', userController.getPanels);
router.get('/notifications', userController.getNotifications);
router.get('/pages', userController.getPages);
router.get('/profile', userController.getProfile);
router.get('/lock-screen', userController.getLockScreen);
router.get('/tables', userController.getTables);
router.get('/typography', userController.getTypography);
router.get('/icons', userController.getIcons);
router.get('/delete-faculty', userController.getDeleteFaculty);
router.get('/add-department', userController.getAddDepartment);

router.get('/delete-department', userController.getDeleteDepartment);
router.get('/faculties', userController.getFaculties);
router.get('/flow-builder', userController.getFlowBuilder);
router.get('/form-page', userController.getFormPage);
router.post('/flow-builder', userController.postFlowBuilder);
router.post('/flow',userController.postFlow);

router.get('/tasks', userController.getTasks);
router.get('/task-detail', userController.getTask);
router.get('/flows', userController.getFlows);
router.get('/flow-detail', userController.getFlow);
module.exports = router;