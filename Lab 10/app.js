// Setup server, session and middleware here.
// const dbConnection = require('./config/mongoConnection');
// const data = require('./data');
// const users = data.users;

const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true
    })
)

app.use('/protected', async (req,res, next) => {
    //Allow to go to next if the user is logged in
    if(!req.session.user){
        return res.render('forbiddenAccess', {title: 'Forbidden Access', err: 'You are not logged in'});
    }
    next();
});

app.use(async(req,res,next) => {
    //need to check if user is authenticated
    if(!req.session.user){
        console.log(`${new Date().toUTCString()}: ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
    }
    else{
        console.log(`${new Date().toUTCString()}: ${req.method} ${req.originalUrl} (Authenticated User)`);
    }
    next();
});

configRoutes(app);

app.listen(3000, () =>{
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
})