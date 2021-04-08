const express = require('express');
const app = express();

module.exports.getIndex= (req,res,next)=>{
    res.render('index',
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
