const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const adminController = require('../controllers/admin');
const isAdmin = require('../middleware/isAdmin');
const viewmw = require('../middleware/viewmiddleware'); 
const csrf = require('../middleware/csrf')
//const productController = require('../controllers/products');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/add-user', isAdmin,csrf,adminController.getAddUser);
router.post('/add-user', isAdmin,csrf,adminController.postAddUser);

router.get('/users',isAdmin,csrf,adminController.getUserList);

router.get('/faculties',isAdmin,csrf,adminController.getFacultyList);

router.get('/add-faculty',isAdmin,csrf,adminController.getAddFaculty);
router.post('/add-faculty',isAdmin,csrf,adminController.postAddFaculty);

router.get('/departments',isAdmin,csrf,adminController.getDepartmentList);

router.get('/add-department',isAdmin,csrf,adminController.getAddDepartment);
router.post('/add-department',isAdmin,csrf,adminController.postAddDepartment);

router.post('/search-department',isAdmin,csrf,adminController.postSearchDepartment);

router.post('/update-user',isAdmin,csrf,adminController.postUpdateUser);
router.get('/update-user/:userid',isAdmin,csrf,adminController.getUpdateUser);

router.get('/delete-user/:userid',isAdmin,csrf,adminController.postDeleteUser);
router.get('/delete-faculty/:facultyid',isAdmin,csrf,adminController.postDeleteFaculty);
router.get('/delete-department/:departmentid',isAdmin,csrf,adminController.postDeleteDepartment);
module.exports = router;

