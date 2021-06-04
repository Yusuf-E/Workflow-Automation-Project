const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const User = require('../models/user')
const Faculty = require('../models/faculty');
const Department = require('../models/department');
const Sequelize = require('sequelize');

app.use(bodyParser.urlencoded({ extended: true }));

module.exports.getIndex = (req, res, next) => {
    console.log(req.session.isAuthenticated)
    res.render('user/index',
        {   title: 'Home',
            path: '/index',
        });
}
module.exports.getResetPassword = (req, res, next) => {
    res.render('account/page-reset-password',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/reset-password'
        });
}
module.exports.getElements = (req, res, next) => {
    res.render('elements',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/elements'
        });
}
module.exports.getCharts = (req, res, next) => {
    res.render('charts',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/charts'
        });
}
module.exports.getPanels = (req, res, next) => {
    res.render('panels',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/panels'
        });
}
module.exports.getNotifications = (req, res, next) => {
    res.render('notifications',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/notifications'
        });
}
module.exports.getPages = (req, res, next) => {
    res.render('pages',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/pages'
        });
}
module.exports.getProfile = (req, res, next) => {
    res.render('user/profile',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/page-profile'
        });
}

module.exports.getLockScreen = (req, res, next) => {
    res.render('lock-screen',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/lock-screen'
        });
}
module.exports.getTables = (req, res, next) => {
    res.render('tables',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/tables'
        });
}
module.exports.getTypography = (req, res, next) => {
    res.render('typography',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/typography'
        });
}
module.exports.getIcons = (req, res, next) => {
    res.render('icons',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/icons'
        });
}
module.exports.getDeleteFaculty = (req, res, next) => {
    res.render('admin/delete-faculty',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/delete-faculty'
        });
}
module.exports.getAddDepartment = (req, res, next) => {
    res.render('admin/add-department',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/add-department'
        });
}
module.exports.getDeleteDepartment = (req, res, next) => {
    res.render('admin/delete-department',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/delete-department'
        });
}
module.exports.getFaculties = (req, res, next) => {
    res.render('admin/faculties',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/faculties'
        });
}
module.exports.getDepartments = (req, res, next) => {
    res.render('admin/departments',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/departments'
        });
}
module.exports.getFlowBuilder = (req, res, next) => {
    res.render('user/form',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/flow-builder'
        });
}
module.exports.postFlowBuilder = (req, res, next) => {
    const approvercount = req.body.approvercount;
    const file = req.file;
    console.log(file)
    console.log(file.filename)
    Faculty.findAll({ order: [['name', 'ASC']] })
        .then((faculties) => {
            let _faculties = faculties;
            Department.findAll({ order: [['name', 'ASC']],})
                .then((departments) => {
                    let _departments = departments;
                    console.log(departments);
                    User.findAll({ order: [['nameSurname', 'ASC']],})
                        .then((users) => {
                            res.render('user/form-page', {
                                title: 'Kurumlar/Fakülteler',
                                departments: _departments,
                                faculties: _faculties,
                                users: users,
                                image: file,
                                approvercount: approvercount,
                                path: '/flow-builder'
                            })
                        })
                })
        }).catch((err) => {
            console.log(err);
        })

}
module.exports.postFlow = (req,res,next)=>{
const file = req.body.imageUrl;
const approverCount = req.body.approvercount;

k='faculty'
console.log(file+approverCount);
for(var i =0;i<approverCount;i++){
    facultyid=req.body['faculty'+i]
    departmentname = req.body['department'+i];
    username = req.body['personal'+i];
    Faculty.findOne({ where: { id: facultyid } })
        .then((faculty)=>{
            _faculty = faculty;
            console.log(faculty.id);
            Department.findOne({ where: { facultyId: faculty.id, name:departmentname } })
                .then((department)=>{
                    console.log(department.id);
                    _department = department;
                    User.findOne({ where: { facultyId: _faculty.id, departmentId: department.id, nameSurname: username } })
                        .then((user)=>{
                            console.log(user);
                        })
                })
        })
        

}





}
module.exports.getFormPage = (req, res, next) => {
    res.render('user/form-page',
        {
            title: 'Form',
            path: '/form-page',
           
        })
}
module.exports.getTasks = (req, res, next) => {
    res.render('user/tasks',
        {
            title: 'Form',
            path: '/tasks'
        })
}
module.exports.getTask = (req, res, next) => {
    res.render('user/task-detail',
        { title: 'Task', isAuthenticated:req.session.isAuthenticated, path: '/task-detail' })
}
module.exports.getFlows = (req, res, next) => {
    res.render('user/flows', {
        title: 'Flows',
         path: '/flows'
    })
}
module.exports.getFlow = (req, res, next) => {
    res.render('user/flow-detail', {
        title: 'Flows',  path: '/flow'
    })
}