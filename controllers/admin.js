const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const sequelize = require('../utility/database');
const path = require('path');
const User = require('../models/user')
const Faculty = require('../models/faculty');
const Department = require('../models/department');

app.use(bodyParser.urlencoded({ extended: true }));

module.exports.getAddUser = (req, res, next) => {
    let faculties;
    Faculty.findAll()
        .then((_faculties) => {
            faculties = _faculties;
            Department.findAll()
                .then((departments) => {
                    res.render('admin/add-user', {
                        title: 'Add-User',
                        departments: departments,
                        faculties: faculties,
                        path: '/admin/add-user',

                    })
                })
        }).catch((err) => {
            console.log(err)
        })

}
module.exports.postAddUser = (req, res, next) => {
    const facultyid = req.body.signinfaculty;
    const department = req.body.signindepartment;
    const program = req.body.signinprogram;
    const personnelId = req.body.signinpersonnelId;
    const name = req.body.signinname;
    const surname = req.body.signinlastname;
    const phoneNumber = req.body.signinphone;
    const email = req.body.signinemail;
    const password = req.body.signinpassword;

    User.findOne({ where: { personnelId: personnelId } })
        .then((user) => {
            if (user) {
                console.log('Bu personel sisteme kayıtlı');
                return res.redirect('/admin/add-user')
            }
            User.findOne({ where: { email: email } })
                .then((user) => {
                    if (user) {
                        console.log('Bu personel sisteme kayıtlı');
                        return res.redirect('/admin/add-user')
                    }
                    return User.create({ personnelId: personnelId, name: name, surname: surname, email: email, password: password, facultyId: facultyid, departmentId: department, program: program, phone: phoneNumber });
                })
                .then(() => {
                    console.log('Kullanıcı Oluşturuldu.');
                    return res.redirect('/admin/users')
                })
        })
}
module.exports.getUserList = (req, res, next) => {
    User.findAll()
        .then((users) => {
            let _users = users;
            Faculty.findAll()
                .then((faculties) => {
                    let _faculties = faculties;
                    Department.findAll()
                        .then((departments) => {
                            res.render('admin/users', {
                                title: 'Kullanıcılar',
                                users: _users,
                                departments: departments,
                                faculties: _faculties,
                                path: '/admin/users'
                            })
                        })
                })
        }).catch((err) => {
            console.log(err);
        })
}
module.exports.getAddFaculty = (req, res, next) => {
    res.render('admin/add-faculty',
        {
            title: 'Reset | İş Akışları Otomasyon Sistemi',
            path: '/admin/add-faculty'
        });
}
module.exports.postAddFaculty = (req, res, next) => {
    const facultyname = req.body.facultyname;
    Faculty.findOne({ where: { name: facultyname } })
        .then((faculty) => {
            if (faculty) {
                console.log('Bu personel sisteme kayıtlı');
                return res.redirect('/admin/add-faculty')
            }
            return Faculty.create({ name: facultyname })
        })
        .then(() => {
            res.redirect('/admin/faculties',);
        })
}
module.exports.getFacultyList = (req, res, next) => {
    Faculty.findAll()
        .then((faculties) => {
            res.render('admin/faculties', {
                title: 'Kurumlar/Fakülteler',
                faculties: faculties,
                path: '/admin/faculties'
            })
        }).catch((err) => {
            console.log(err);
        })
}
module.exports.getAddDepartment = (req, res, next) => {
    Faculty.findAll()
        .then((faculties) => {
            res.render('admin/add-department',
                {
                    title: 'Bölüm Ekle',
                    faculties: faculties,
                    path: '/admin/add-department'
                });
        })

}
module.exports.postAddDepartment = (req, res, next) => {
    const facultyid = req.body.facultyname;
    const departmentname = req.body.departmentname;
    Department.findOne({ where: { name: departmentname } })
        .then((department) => {
            if (department) {
                console.log('Bu departman sistemde kayıtlı');
                return res.redirect('/admin/add-department')
            }
            return Department.create({ name: departmentname, facultyId: facultyid })
        })
        .then(() => {
            res.redirect('/admin/departments',);
        })
}
module.exports.getDepartmentList = (req, res, next) => {
    Faculty.findAll()
        .then((faculties) => {
            let _faculties=faculties;
            Department.findAll()
                .then((departments) => {
                    res.render('admin/departments', {
                        title: 'Kurumlar/Fakülteler',
                        departments: departments,
                        faculties: _faculties,
                        path: '/admin/departments'
                    })
                })
        }).catch((err) => {
            console.log(err);
        })
}
