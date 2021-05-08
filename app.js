const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');





const sequelize = require('./utility/database');


const User = require('./models/user');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname , 'public')));



sequelize
    //.sync({ force: true })
    .sync()
    .then( ()=> {

    }).catch(function (err) {
        console.log(err);
    })
app.get('/admin/add-user',(req,res,next)=>{
    res.render('admin/add-user', {
        title: 'Admin Products',
        path: '/admin/add-user',

    })
})

    app.use(userRoutes);

app.listen(3000, function () {
    console.log("Port 3000 listening");
});