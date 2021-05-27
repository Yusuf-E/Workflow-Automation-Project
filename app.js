const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const session = require('express-session');
const multer = require('multer');




const sequelize = require('./utility/database');

const Faculty = require('./models/faculty');
const User = require('./models/user');
const Department = require('./models/department');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().single('formfile'));
app.use(express.static(path.join(__dirname , 'public')));

app.use('/admin',adminRoutes);
app.use(userRoutes);
app.use(accountRoutes);

User.belongsTo(Faculty, {
    foreignKey: {
        allowNull: false
    }
});
Faculty.hasMany(User);

Faculty.hasMany(Department);
Department.belongsTo(Faculty);

User.belongsTo(Department,{
    foreignKey:{
        allowNull:false
    }
});
Department.hasMany(User);

sequelize
   //.sync({ force: true })
    .sync()
    .then( ()=> {

    }).catch(function (err) {
        console.log(err);
    })


app.listen(3000, function () {
    console.log("Port 3000 listening");
});