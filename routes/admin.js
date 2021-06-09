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

router.get('/faculties',adminController.getFacultyList);

router.get('/add-faculty',adminController.getAddFaculty);
router.post('/add-faculty',adminController.postAddFaculty);

router.get('/departments',adminController.getDepartmentList);

router.get('/add-department',adminController.getAddDepartment);
router.post('/add-department',adminController.postAddDepartment);

router.post('/search-department',adminController.postSearchDepartment);

router.post('/update-user',adminController.postUpdateUser);
router.get('/update-user/:userid',adminController.getUpdateUser);

router.get('/delete-user/:userid',adminController.postDeleteUser);
router.get('/delete-faculty/:facultyid',adminController.postDeleteFaculty);
module.exports = router;

