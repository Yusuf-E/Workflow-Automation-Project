const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/index',userController.getIndex);
router.get('/',userController.getLogin);

router.get('/reset-password',userController.getResetPassword);
router.get('/elements',userController.getElements);
router.get('/charts',userController.getCharts);
router.get('/panels',userController.getPanels);
router.get('/notifications',userController.getNotifications);
router.get('/pages',userController.getPages);
router.get('/profile',userController.getProfile);
router.get('/page-login',userController.getLoginScreen);
router.get('/lock-screen',userController.getLockScreen);
router.get('/tables',userController.getTables);
router.get('/typography',userController.getTypography);
router.get('/icons',userController.getIcons);
router.get('/add-user',userController.getAddUser);
router.get('/users',userController.getUsers);
router.get('/add-faculty',userController.getAddFaculty);
router.get('/delete-faculty',userController.getDeleteFaculty);
router.get('/add-department',userController.getAddDepartment);
router.get('/departments',userController.getDepartments);
router.get('/delete-department',userController.getDeleteDepartment);
router.get('/faculties',userController.getFaculties);
module.exports = router;