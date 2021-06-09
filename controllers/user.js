const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const User = require('../models/user')
const Faculty = require('../models/faculty');
const Department = require('../models/department');
const Sequelize = require('sequelize');
const Flow = require('../models/flow');
const TaskItem = require('../models/taskitem');
app.use(bodyParser.urlencoded({ extended: true }));

module.exports.getIndex = (req, res, next) => {
    console.log(req.session.isAuthenticated)
    res.render('user/index',
        {
            title: 'Home',
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
    const date = require('moment')(req.user.createdAt).format('DD.MM.YYYY');
    const birthdate = require('moment')(req.user.birthdate).format('YYYY-MM-DD');
    let _department;
    Department.findOne({ where: { id: req.user.departmentId } })
        .then((department) => {
            console.log(department);
            _department = department;
            Faculty.findOne({ where: { id: _department.facultyId } })
                .then((faculty) => {
                    console.log(faculty);
                    res.render('user/profile',
                        {
                            title: 'Reset | İş Akışları Otomasyon Sistemi',
                            user: req.user,
                            faculty: faculty,
                            department: _department,
                            date: date,
                            birthdate:birthdate,
                            path: '/page-profile'
                        });
                })
        })

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
    const ownerId = req.body.owner;
    console.log(file)
    console.log(file.filename)
    Faculty.findAll({ order: [['name', 'ASC']] })
        .then((faculties) => {
            let _faculties = faculties;
            Department.findAll({ order: [['name', 'ASC']], })
                .then((departments) => {
                    let _departments = departments;
                    console.log(departments);
                    User.findAll({ order: [['nameSurname', 'ASC']], })
                        .then((users) => {
                            res.render('user/form-page', {
                                title: 'Kurumlar/Fakülteler',
                                departments: _departments,
                                faculties: _faculties,
                                users: users,
                                image: file,
                                approvercount: approvercount,
                                ownerId: ownerId,
                                path: '/flow-builder'
                            })
                        })
                })
        }).catch((err) => {
            console.log(err);
        })

}
module.exports.postFlow = (req, res, next) => {

    const file = JSON.parse(req.body.imageUrl);
    const approverCount = req.body.approvercount;
    const user = req.user;
    const number = 0;
    const ownerId = req.body.ownerId;
    let _flow;
    var personal;
    console.log(user);
    user.createFlow({
        number: number,
        imageUrl: file.filename,
        approverCount: approverCount,
        ownerId: ownerId,
    })
        .then(() => {
            Flow.findOne({ where: { imageUrl: file.filename } })
                .then((flow) => {
                    _flow = flow;
                    for (var i = 0; i < approverCount; i++) {
                        personal = req.body['personal' + i]
                        console.log(personal);
                        User.findOne({ where: { id: personal } })
                            .then((personal) => {
                                personal
                                    .getTask()
                                    .then((task) => {
                                        task.addFlow(_flow, {
                                            through: {
                                                confirmation: null
                                            }
                                        })
                                    })
                            })
                    }
                })
        })

}
module.exports.getFormPage = (req, res, next) => {
    res.render('user/form-page',
        {
            title: 'Form',
            path: '/form-page',

        })
}
module.exports.getTasks = (req, res, next) => {
    let _users;
    User.findAll()
        .then((users) => {
            _users = users
        })
        .then(() => {
            req.user
                .getTask()
                .then((task) => {
                    console.log(task);
                    return task.getFlows({ order: [['id', 'DESC']], })
                        .then((flows) => {
                            console.log(flows)
                            res.render('user/tasks', {
                                title: 'Görevler',
                                path: '/tasks',
                                flows: flows,
                                users: _users,
                                isAuthenticated: req.session.isAuthenticated,
                            });
                        })
                }).catch(function (err) {
                    console.log(err)
                })
        })
}
module.exports.getTask = (req, res, next) => {
    const flowid = req.params.flowid;
    req.user
        .getTask()
        .then((task) => {
            return task.getFlows({ where: { id: flowid } })
        })
        .then((flows) => {
            const flow = flows[0];
            return flow;
        })
        .then((result) => {
            res.render('user/task-detail',
                { title: 'Task', isAuthenticated: req.session.isAuthenticated, flow: result, path: '/tasks' })
        })
}
module.exports.getFlows = (req, res, next) => {
    let _flows, _items;
    Flow.findAll({ order: [['id', 'DESC']], })
        .then((flows) => {
            _flows = flows;
            User.findAll()
                .then((users) => {
                    _users = users;
                    TaskItem.findAll()
                        .then((items) => {
                            _items = items
                            console.log(_flows);
                            console.log(_items);
                            res.render('user/flows', {
                                title: 'Flows',
                                flows: _flows,
                                items: _items,
                                users: _users,
                                path: '/flows'
                            })
                        })

                })

        })
}
module.exports.getFlow = (req, res, next) => {
    let _flow, _users;
    const flowid = req.params.flowid;
    Flow.findOne({ where: { id: flowid } })
        .then((flow) => {
            _flow = flow;
            User.findAll()
                .then((users) => {
                    _users = users;
                    TaskItem.findAll({ where: { flowId: flowid } })
                        .then((taskItem) => {
                            res.render('user/flow-detail', {
                                title: 'Flows', items: taskItem, flow: _flow, users: _users, path: '/flow'
                            })
                        })
                })
        })
}
module.exports.postDesicionAccept = (req, res, next) => {
    const flow = JSON.parse(req.body.flow);
    let _flow;
    req.user
        .getTask()
        .then((task) => {
            return task.getFlows({ where: { id: flow.id } })
        })
        .then((flows) => {
            let flow;
            if (flows.length > 0) {
                flow = flows[0];
                _flow = flow;
            }
            flow.taskitem.confirmation = true;
            return flow.taskitem.save();
        })
        .then((result) => {
            res.redirect('/tasks');
        })
}
module.exports.postDesicionDeny = (req, res, next) => {
    const flow = JSON.parse(req.body.flow);
    let _flow;
    req.user
        .getTask()
        .then((task) => {
            return task.getFlows({ where: { id: flow.id } })
        })
        .then((flows) => {
            let flow;
            if (flows.length > 0) {
                flow = flows[0];
                _flow = flow;
            }
            flow.taskitem.confirmation = false;
            return flow.taskitem.save();
        })
        .then((result) => {
            res.redirect('/tasks');
        })
}
module.exports.postSearchUser = (req, res, next) => {
    const formowner = req.body.searchBar;
    let _flows, _items;
    Flow.findAll({ where: { ownerId: formowner }, order: [['id', 'DESC']], })
        .then((flows) => {
            _flows = flows;
            User.findAll()
                .then((users) => {
                    _users = users;
                    TaskItem.findAll()
                        .then((items) => {
                            _items = items
                            console.log(_flows);
                            console.log(_items);
                            res.render('user/flows', {
                                title: 'Flows',
                                flows: _flows,
                                items: _items,
                                users: _users,
                                path: '/flows'
                            })
                        })

                })

        })

}
module.exports.postProfile = (req,res,next)=>{
   const userimage= req.file;
   const adress= req.body.adress;
   const city= req.body.city;
   const phone= req.body.phone;
   const district= req.body.district;
   const secondemail= req.body.secondmail;
   const birthdate= req.body.birthdate;
   const facebook= req.body.facebook;
   const twitter= req.body.twitter;
   const instagram= req.body.instagram;
   console.log(req.user.email)
   if(userimage!== undefined){
       req.user.imageUrl= userimage.filename;
   }
   req.user.adress= adress;
   req.user.city= city;
   req.user.phone= phone;
   req.user.district= district;
   req.user.secondemail= secondemail;
   req.user.birthdate= birthdate;
   req.user.facebook= facebook;
   req.user.twitter= twitter;
   req.user.instagram= instagram;
   req.user.save();
   res.redirect('/profile')


}