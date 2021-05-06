const express = require('express');
const app = express();

module.exports.getIndex1= (req,res,next)=>{
    res.render('index1',
   {title:'Home',
    path:'/index'});
}
module.exports.getIndex= (req,res,next)=>{
    res.render('user/index',
   {title:'Home',
    path:'/index'});
}
module.exports.getLogin= (req,res,next)=>{
    res.render('account/page-login',
   {title:'Giriş | İş Akışları Otomasyon Sistemi',
    path:'/'});
}
module.exports.getResetPassword = (req,res,next)=>{
    res.render('account/page-reset-password',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/reset-password'});
}
module.exports.getElements = (req,res,next)=>{
    res.render('elements',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/elements'});
}
module.exports.getCharts = (req,res,next)=>{
    res.render('charts',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/charts'});
}
module.exports.getPanels = (req,res,next)=>{
    res.render('panels',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/panels'});
}
module.exports.getNotifications = (req,res,next)=>{
    res.render('notifications',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/notifications'});
}
module.exports.getPages = (req,res,next)=>{
    res.render('pages',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/pages'});
}
module.exports.getProfile = (req,res,next)=>{
    res.render('user/profile',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/page-profile'});
}
module.exports.getLoginScreen = (req,res,next)=>{
    res.render('page-login',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/page-login'});
}
module.exports.getLockScreen = (req,res,next)=>{
    res.render('lock-screen',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/lock-screen'});
}
module.exports.getTables = (req,res,next)=>{
    res.render('tables',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/tables'});
}
module.exports.getTypography = (req,res,next)=>{
    res.render('typography',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/typography'});
}
module.exports.getIcons = (req,res,next)=>{
    res.render('icons',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/icons'});
}
module.exports.getAddUser = (req,res,next)=>{
    res.render('admin/add-user',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/add-user'});
}
module.exports.getUsers = (req,res,next)=>{
    res.render('admin/users',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/users'});
}
module.exports.getAddFaculty = (req,res,next)=>{
    res.render('admin/add-faculty',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/add-faculty'});
}
module.exports.getDeleteFaculty = (req,res,next)=>{
    res.render('admin/delete-faculty',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/delete-faculty'});
}
module.exports.getAddDepartment = (req,res,next)=>{
    res.render('admin/add-department',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/add-department'});
}
module.exports.getDeleteDepartment = (req,res,next)=>{
    res.render('admin/delete-department',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/delete-department'});
}
module.exports.getFaculties = (req,res,next)=>{
    res.render('admin/faculties',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/faculties'});
}
module.exports.getDepartments = (req,res,next)=>{
    res.render('admin/departments',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/departments'});
}
module.exports.getFormBuilder = (req,res,next)=>{
    res.render('user/form',
    {title:'Reset | İş Akışları Otomasyon Sistemi',
    path:'/form-builder'});
}
module.exports.getFormPage = (req,res,next)=>{
    res.render('user/form-page',
    {title:'Form',
        path:'/form-page'})
}
module.exports.getTasks = (req,res,next)=>{
    res.render('user/tasks',
    {title:'Form',
        path:'/tasks'})
}