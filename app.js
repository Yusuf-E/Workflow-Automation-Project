const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const mysqlDbStore = require('express-mysql-session')(session);



const sequelize = require('./utility/database');

const Faculty = require('./models/faculty');
const User = require('./models/user');
const Department = require('./models/department');
const Flow = require('./models/flow');
const Task = require('./models/task');
const TaskItem = require('./models/taskitem');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', './views');

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql123',
    database: 'workflow-app'
};
var store = new mysqlDbStore(options);
app.use(session({
    key: 'session_cookie_name',
    secret: 'keyboard cat',
    store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000000
    }
}))

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/assets/fileimg')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})


app.use(express.static(path.join(__dirname, 'public')));

app.use(multer({ storage: storage }).single('formfile'));

app.use('/admin', adminRoutes);
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

User.belongsTo(Department, {
    foreignKey: {
        allowNull: false
    }
});
Department.hasMany(User);

sequelize
    //.sync({ force: true })
    .sync()
    .then(() => {

    }).catch(function (err) {
        console.log(err);
    })


app.listen(3000, function () {
    console.log("Port 3000 listening");
});